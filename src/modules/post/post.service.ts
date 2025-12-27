import prisma from "../../../core/databaseClient/prismaClient/prismaClient.js";
import { NotFoundExcpetion } from "../../../core/errors/NotFoundExcpetion.js";
import { UnauthorizedExcpetion } from "../../../core/errors/UnauthorizedExcpetion copy.js";

/**
 * Fetches all Post data.
 */
export async function getAll() {
    return "List of all Posts retrieved from the service.";
}

/**
 * Fetches a single Post by ID.
 */
export async function getById(id: string) {
    return `Post with ID: \${id\} retrieved from the service.`;
}

/**
 * Processes data to create a new Post.
 */
export async function create(userId: string, data: any) {
    data.userId = userId;
    const post = await prisma.post.create({ data });
    return post;
}

/**
 * Processes data to update an existing Post.
 */
export async function update(actorId: string, id: string, data: any) {
    // 1- Checking if post exists
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) throw new NotFoundExcpetion('Post not found');

    // 1- Checking if user owns the post
    if (post.userId !== actorId) throw new UnauthorizedExcpetion('You don\'t have permission to edit this post');

    // 3- Updating the post
    const updatedPost = await prisma.post.update({
        where: { id },
        data
    })

    return updatedPost;
}

/**
 * Performs the deletion of a Post record.
 */
export async function remove(id: string) {
    return "Post with ID: \${id\} deleted successfully.";
}