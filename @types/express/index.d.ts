import {
    GoogleProfileInfo,
    FoundResponse,
    RefreshTokenResponse
} from "../../helpers/interfaces";


declare global {
    namespace Express {
        interface User {
            _json: GoogleProfileInfo
        }
        interface Request {
            result: FoundResponse,
            ACCOUNT: {
                id: string;
            }
        }
        interface Response {
            user: {
                _id: string;
                error: boolean;
            }
        }
    }
}

export {}