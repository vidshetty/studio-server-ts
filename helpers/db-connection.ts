import mongodb, { MongoClient } from "mongodb";
import { ENV } from "./utils";



export class MongoAccountsHandler {

    // DB connection
    private static __db: mongodb.Db | null = null;

    // collections
    private static __Accounts: mongodb.Collection;

    static async initialize() {

        const MONGO_URI = ENV("MONGO_URI");

        if (MONGO_URI === null) throw new Error("invalid environment");

        if (this.__db !== null) return;

        const Database: mongodb.MongoClient = await MongoClient.connect(MONGO_URI);

        this.__db = Database.db("finance");

        this.__Accounts = this.__db.collection("accounts");

    };

    static getCollectionSet() {
        return Object.freeze({
            Accounts: this.__Accounts
        });
    };

};