import prisma from "../../../core/databaseClient/prismaClient/prismaClient.js";
import { NotFoundExcpetion } from "../../../core/errors/NotFoundExcpetion.js";
import { UnauthorizedExcpetion } from "../../../core/errors/UnauthorizedExcpetion.js";
import { checkPostExists } from "../post/post.service.js";

export async function checkCommentExists(id: string) {
    const comment = await prisma.comment.findUnique({ where: { id } });
    if (!comment || comment.isDeleted) throw new NotFoundExcpetion('Comment not found');
    return comment;
}

/**
 * Fetches all Comment data.
 */
export async function getAll(postId: string, limit: number = 10, cursor: string | undefined) {
    // 1- Check post exists
    const post = await checkPostExists(postId);

    // 2- Retreive undeleted comment with cursor pagination
    const query: any = {
        take: limit + 1,
        orderBy: { id: 'asc' },
        where: { postId, isDeleted: false }
    }
    if (cursor) query.cursor = { id: cursor };

    const comments = await prisma.comment.findMany(query);

    let hasNextPage: boolean = false;
    let nextCursor: string | null = null;
    if (comments.length > limit) {
        hasNextPage = true;
        nextCursor = comments[limit].id;
        comments.pop();
    }

    return { comments, pagination: { hasNextPage, nextCursor, count: comments.length } };
}

/**
 * Fetches a single Comment by ID.
 */
export async function getById(id: string) {
    // 1- Checking if comment exists and not deleted
    const comment = await checkCommentExists(id)

    // 2- Check if post exists
    const post = await checkPostExists(comment.postId);

    // 3- Fetch one comment
    return comment;
}

/**
 * Processes data to create a new Comment.
 */
export async function create(actorId: string, postId: string, data: any) {
    // 1- Check if post exists
    const post = await checkPostExists(postId);

    // 2- Create comment
    const comment = await prisma.comment.create({ data: { userId: actorId, postId, content: data.content } })

    // 3- increase count in the entity
    await prisma.post.update({
        where: { id: postId },
        data: { commentCount: { increment: 1 } }
    });

    return comment;
}

/**
 * Processes data to update an existing Comment.
 */
export async function update(actorId: string, id: string, data: any) {
    // 1- Checking if comment exists and not deleted
    const comment = await checkCommentExists(id)

    // 2- Check if post exists
    const post = await checkPostExists(comment.postId);

    // 3- Check if actor is owner
    if (actorId !== comment.userId) throw new UnauthorizedExcpetion("Can't delete comment that is not your own");

    // 4- Update the comment
    const updatedComment = await prisma.comment.update({ where: { id }, data: { content: data.content } });

    return updatedComment;
}

/**
 * Performs the deletion of a Comment record.
 */
export async function remove(actorId: string, id: string) {
    // 1- Check if comment exsits
    const comment = await checkCommentExists(id);

    // 2- Check of post exists
    const post = await checkPostExists(comment.postId);

    // 3- Check if actor is owner
    if (actorId !== comment.userId) throw new UnauthorizedExcpetion("Can't delete comment that is not your own");

    // 4- Delete comment
    await prisma.comment.update({ where: { id }, data: { isDeleted: true } })
    comment.isDeleted = true;

    // 5- decrease count in the entity
    await prisma.post.update({ where: { id: comment.postId }, data: { commentCount: { decrement: 1 } } });

    return comment;
}