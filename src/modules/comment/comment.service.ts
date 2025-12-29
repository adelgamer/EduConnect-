import prisma from "../../../core/databaseClient/prismaClient/prismaClient.js";
import { checkPostExists } from "../post/post.service.js";

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
    return `Comment with ID: \${id\} retrieved from the service.`;
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