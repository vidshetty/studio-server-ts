"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongodb_1 = require("mongodb");
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const path_1 = __importDefault(require("path"));
const db_connection_1 = require("../helpers/db-connection");
const router = (0, express_1.Router)();
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
router.get("/", async (req, res) => {
    return res.status(200).sendFile(path_1.default.join(__dirname, "account.html"));
});
router.get("/js", async (req, res) => {
    return res.status(200).sendFile(path_1.default.join(__dirname, "account.js"));
});
router.get("/category", async (req, res) => {
    return res.status(200).send(categories);
});
router.post("/entry", async (req, res) => {
    try {
        const body = req.body;
        const { Accounts } = db_connection_1.MongoAccountsHandler.getCollectionSet();
        const entry = {
            _id: new mongodb_1.ObjectId(),
            date: moment_timezone_1.default.utc(body.date, "YYYY-MM-DD").toDate(),
            category: body.category,
            description: body.description || "",
            amount: body.amount ? parseFloat(body.amount) : 0
        };
        await Accounts.insertOne(entry);
        return res.status(200).send(entry);
    }
    catch (e) {
        console.log("accounts error", e);
        return res.status(500).end();
    }
});
router.get("/csv", async (req, res) => {
    const { from = null, to = null } = req.query;
    if (from === null || to === null)
        return res.status(500).end();
    const { Accounts } = db_connection_1.MongoAccountsHandler.getCollectionSet();
    const entries = await Accounts.find({
        date: {
            $gte: moment_timezone_1.default.utc(from, "YYYY-MM-DD").toDate(),
            $lte: moment_timezone_1.default.utc(to, "YYYY-MM-DD").toDate()
        }
    }).toArray();
    const headers = ["Date", "Description", ...categories].join(",");
    const csv = entries.map(entry => {
        let str = "";
        str += moment_timezone_1.default.utc(entry.date).format("MMM DD YYYY") + ",";
        str += ",";
        for (let i = 0; i < categories.length; i++) {
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
    return res.status(200).send([headers, ...csv].join("\n"));
});
router.use("*", (_, response) => {
    return response.status(404).end();
});
exports.default = router;
//# sourceMappingURL=index.js.map