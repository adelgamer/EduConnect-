import type { User } from "../../generated/prisma/client.js"

export function sanitizeUser(user: User) {
    const userToReturn: Partial<User> = { ...user };
    delete userToReturn.passwordHash;

    return userToReturn;
}