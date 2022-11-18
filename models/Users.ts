import mongoose, { Schema } from "mongoose";


const UserSchema = new Schema({
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
        type: {
            type: String,
            enum: ["under_review","allowed","revoked","expired"]
        },
        uid: { type: String }
    },
    loggedIn: {
        type: String,
        enum: ["logged in","logged out","signed up"]
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
    },
    activeSessions: [{
        seen: { type: Boolean },
        device: { type: String },
        sessionId: { type: String }
    }]
});


export const Users = mongoose.model("user", UserSchema);