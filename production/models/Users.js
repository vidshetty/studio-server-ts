"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const UserSchema = new mongoose_1.Schema({
    username: { type: String },
    email: {
        id: { type: String },
        verificationStatus: {
            type: String,
            enum: [
                "pending",
                "verified"
            ]
        },
        uuid: { type: String },
        uuidExpiry: { type: Date }
    },
    password: {
        key: { type: String },
        uuid: { type: String },
        uuidExpiry: { type: Date }
    },
    googleAccount: {
        exists: { type: Boolean },
        sub: { type: String },
        email: { type: String },
        email_verified: { type: Boolean },
        name: { type: String },
        picture: { type: String }
    },
    accountAccess: {
        duration: { type: Number },
        timeLimit: { type: Date },
        seen: { type: Boolean },
        type: {
            type: String,
            enum: ["under_review", "allowed", "revoked", "expired"]
        },
        uid: { type: String }
    },
    loggedIn: {
        type: String,
        enum: ["logged in", "logged out", "signed up"]
    },
    lastUsed: { type: String },
    recentsLastModified: { type: Date },
    recentlyPlayed: [{
            albumId: { type: String },
            frequency: { type: Number },
            last: { type: Date }
        }],
    status: {
        type: String,
        enum: [
            "active",
            "inactive"
        ]
    },
    recentlySearched: {
        type: Array,
        default: []
    }
});
exports.Users = mongoose_1.default.model("user", UserSchema);
//# sourceMappingURL=Users.js.map