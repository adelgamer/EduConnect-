import prisma from "../../../core/databaseClient/prismaClient/prismaClient.js";
import { NotFoundExcpetion } from "../../../core/errors/NotFoundExcpetion.js";
import { checkPostExists } from "../post/post.service.js";

async function checkCommentExists(id: string) {
    const comment = await prisma.comment.findUnique({ where: { id } });
    if (!comment || comment.isDeleted) throw new NotFoundExcpetion('Comment not found');
    return comment;
}

/**
 * Fetches all Comment data.
 */
export async function getAll() {
    return "List of all Comments retrieved from the service.";
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

    return comment;
}

/**
 * Processes data to update an existing Comment.
 */
export async function update(id: string, data: any) {
    return "Comment with ID: \${id\} updated successfully.";
}

/**
 * Performs the deletion of a Comment record.
 */
export async function remove(id: string) {
    return "Comment with ID: \${id\} deleted successfully.";
}