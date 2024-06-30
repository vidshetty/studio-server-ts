"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoAccountsHandler = void 0;
const mongodb_1 = require("mongodb");
const utils_1 = require("./utils");
class MongoAccountsHandler {
    static async initialize() {
        const MONGO_URI = (0, utils_1.ENV)("MONGO_URI");
        if (MONGO_URI === null)
            throw new Error("invalid environment");
        if (this.__db !== null)
            return;
        const Database = await mongodb_1.MongoClient.connect(MONGO_URI);
        this.__db = Database.db("finance");
        this.__Accounts = this.__db.collection("accounts");
    }
    ;
    static getCollectionSet() {
        return Object.freeze({
            Accounts: this.__Accounts
        });
    }
    ;
}
exports.MongoAccountsHandler = MongoAccountsHandler;
// DB connection
MongoAccountsHandler.__db = null;
;
//# sourceMappingURL=db-connection.js.map