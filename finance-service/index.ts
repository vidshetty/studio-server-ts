import express, { Router, Request, Response } from "express";
import { ObjectId } from "mongodb";
import moment from "moment-timezone";
import path from "path";
import { AccountEntry } from "../helpers/interfaces";
import { MongoAccountsHandler } from "../helpers/db-connection";



const router = Router();



const categories = [
    "Food",
    "Subscriptions",
    "CS",
    "D",
    "Decimal Investment",
    "Miscellaneous",
    "Istri",
    "Electricity Bill",
    "Rent",
    "Petrol",
    "Instamart",
    "Amazon",
    "Myntra",
    "WIFI",
    "Refunds"
];



router.get("/", async (req: Request, res: Response) => {
    return res.status(200).sendFile(path.join(process.cwd(), "finance-service", "account.html"));
});

router.get("/js", async (req: Request, res: Response) => {
    return res.status(200).sendFile(path.join(process.cwd(), "finance-service", "account.js"));
});

router.get("/category", async (req: Request, res: Response) => {
    return res.status(200).send(categories);
});

router.post("/entry", async (req: Request, res: Response) => {

    try {

        const body = req.body as
            unknown as
            {
                date: string;
                category: string;
                description: string;
                amount: string;
            };

        const { Accounts } = MongoAccountsHandler.getCollectionSet();

        const entry: AccountEntry = {
            _id: new ObjectId(),
            date: moment.utc(body.date, "YYYY-MM-DD").toDate(),
            category: body.category,
            description: body.description || "",
            amount: body.amount ? parseFloat(body.amount) : 0
        };

        await Accounts.insertOne(entry);

        return res.status(200).send(entry);

    }
    catch(e) {

        console.log("accounts error", e);
        return res.status(500).end();

    }

});

router.get("/csv", async (req: Request, res: Response) => {

    const {
        from = null,
        to = null
    } = req.query as
        unknown as
        {
            from: string | null;
            to: string | null;
        };

    if (from === null || to === null) return res.status(500).end();

    const { Accounts } = MongoAccountsHandler.getCollectionSet();

    const entries = await Accounts.find({
        date: {
            $gte: moment.utc(from, "YYYY-MM-DD").toDate(),
            $lte: moment.utc(to, "YYYY-MM-DD").toDate()
        }
    }).toArray() as AccountEntry[];

    const headers = ["Date", "Description", ...categories].join(",");

    const csv = entries.map(entry => {
        let str = "";
        str += moment.utc(entry.date).format("MMM DD YYYY") + ",";
        str += ",";
        for (let i=0; i<categories.length; i++) {
            const isLast = i === categories.length - 1;
            if (entry.category === categories[i]) {
                str += isLast ? String(entry.amount) : String(entry.amount) + ",";
            }
            else {
                str += isLast ? "" : ",";
            }
        }
        return str;
    });

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename="accounts.csv"`);

    return res.status(200).send([headers,...csv].join("\n"));

});

router.use("*", (_:any, response: Response) => {
    return response.status(404).end();
});



export default router;