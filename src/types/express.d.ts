import { JwtPayload } from "jsonwebtoken";
export { };

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload & {
                userId: string;
            };
        }
    }
}
