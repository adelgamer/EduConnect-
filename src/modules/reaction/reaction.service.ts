import prisma from "../../../core/databaseClient/prismaClient/prismaClient.js";
import { NotFoundExcpetion } from "../../../core/errors/NotFoundExcpetion.js";

/**
 * Fetches all Reaction data.
 */
export async function getAll() {
    return "List of all Reactions retrieved from the service.";
}

/**
 * Fetches a single Reaction by ID.
 */
export async function getById(id: string) {
    return `Reaction with ID: \${id\} retrieved from the service.`;
}

/**
 * Processes data to create a new Reaction.
 */
export async function create(actorId: string, postId: string, data: any) {
    let reaction;
    // 1- Checking if post exists and not deleted
    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post || (post && post.isDeleted)) throw new NotFoundExcpetion('Post not found');

    // 2- Check if reaction from the same actor exists
    // const isSameActorReactionExists = post.reactions.find((reac) => reac.userId === actorId);
    const isSameActorReactionExists = await prisma.reaction.findFirst({ where: { userId: actorId, postId } });

    // 3- Reaction from same actor and same reaction remove reaction
    if (isSameActorReactionExists && data.reactionType === isSameActorReactionExists.reactionType) {
        await prisma.reaction.delete({
            where: { id: isSameActorReactionExists.id }
        })
        reaction = null;
    }

    // 4- Reaction from same actor and differnt reaction update reaction
    else if (isSameActorReactionExists && data.reactionType !== isSameActorReactionExists.reactionType) {
        reaction = await prisma.reaction.update({
            where: { id: isSameActorReactionExists.id }, data: { reactionType: data.reactionType }
        });
    };

    // 5- If no reaction exists just create a new one
    if (!isSameActorReactionExists) reaction = await prisma.reaction.create({
        data: {
            userId: actorId,
            postId,
            reactionType: data.reactionType
        }
    })

    // 6- Return reaction
    return reaction;
}

/**
 * Processes data to update an existing Reaction.
 */
export async function update(id: string, data: any) {
    return "Reaction with ID: \${id\} updated successfully.";
}

/**
 * Performs the deletion of a Reaction record.
 */
export async function remove(id: string) {
    return "Reaction with ID: \${id\} deleted successfully.";
}