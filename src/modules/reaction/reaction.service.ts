import prisma from "../../../core/databaseClient/prismaClient/prismaClient.js";
import { NotFoundExcpetion } from "../../../core/errors/NotFoundExcpetion.js";
import { checkCommentExists } from "../comment/comment.service.js";
import { checkPostExists } from "../post/post.service.js";

export enum EntityType {
    POST = 'POST',
    COMMENT = 'COMMENT'
}

/**
 * Fetches all Reaction data.
 */
export async function getAll(entityId: string, entityType: EntityType, cursor: string | null, limit: number = 10) {
    // 1- Checking if entity exists
    let entity: any;
    if (entityType === EntityType.POST) entity = await checkPostExists(entityId)
    else if (entityType === EntityType.COMMENT) entity = await checkCommentExists(entityId)

    // 2- Reteive reactions
    const query: any = {
        take: limit + 1,
        orderBy: { id: 'asc' },
        where: {}
    }
    if (entityType === EntityType.POST) query.where.postId = entityId
    else if (entityType === EntityType.COMMENT) query.where.commentId = entityId;

    if (cursor) query.cursor = { id: cursor };
    const reactions = await prisma.reaction.findMany(query);

    let hasNextPage: boolean = false;
    let nextCursor: string | null = null;
    if (reactions.length > limit) {
        hasNextPage = true;
        nextCursor = reactions[limit].id;
        reactions.pop();
    }

    return { reactions, pagination: { hasNextPage, nextCursor, count: reactions.length } };
}

/**
 * Fetches a single Reaction by ID.
 */
export async function getById(id: string) {
    const reaction = await prisma.reaction.findUnique({ where: { id } })
    if (!reaction) throw new NotFoundExcpetion('Reaction not found');
    return reaction;
}

/**
 * Processes data to create a new Reaction.
 */
export async function create(actorId: string, entityId: string, data: any, entityType: EntityType) {
    let reaction;
    // 1- Checking if post exists and not deleted
    let entity: any;
    if (entityType === EntityType.POST) entity = await checkPostExists(entityId)
    else if (entityType === EntityType.COMMENT) entity = await checkCommentExists(entityId)

    // 2- Check if reaction from the same actor exists
    const whereCondition: any = { userId: actorId }
    if (entityType === EntityType.POST) whereCondition.postId = entityId
    else if (entityType === EntityType.COMMENT) whereCondition.commentId = entityId;
    const isSameActorReactionExists = await prisma.reaction.findFirst({ where: whereCondition });

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
    const dataToInsert: any = {
        userId: actorId,
        reactionType: data.reactionType
    }
    if (entityType === EntityType.POST) dataToInsert.postId = entityId
    else if (entityType === EntityType.COMMENT) dataToInsert.commentId = entityId;
    if (!isSameActorReactionExists) reaction = await prisma.reaction.create({ data: dataToInsert })

    // 6- Return reaction
    return reaction;
}

/**
 * Processes data to update an existing Reaction.
 */
// export async function update(id: string, data: any) {
//     return "Reaction with ID: \${id\} updated successfully.";
// }

/**
 * Performs the deletion of a Reaction record.
 */
// export async function remove(id: string) {
//     return "Reaction with ID: \${id\} deleted successfully.";
// }