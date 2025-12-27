import { Request } from "express";
import { UnauthorizedExcpetion } from "../../core/errors/UnauthorizedExcpetion copy.js";
import type { User } from "../../generated/prisma/client.js"

export function sanitizeUser(user: User) {
    const userToReturn: Partial<User> = { ...user };
    delete userToReturn.passwordHash;

    return userToReturn;
}

export function getAccessToken(req: Request): string | undefined {
    let accessToken: string | undefined = undefined;
    const IS_HTTP_COOKIE = process.env.IS_HTTP_COOKIE === "true" ? true : false;
    if (IS_HTTP_COOKIE) {
        accessToken = req.cookies.accessToken;
    }
    else {
        accessToken = req.get('Authorization');
        if (accessToken && accessToken.split(" ")[1]) accessToken = accessToken.split(" ")[1];
    }

    return accessToken;
}