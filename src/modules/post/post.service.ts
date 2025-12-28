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
    // 1- Checking if post exists and not deleted
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post || (post && post.isDeleted)) throw new NotFoundExcpetion('Post not found');

    // 2- return the post
    return post;
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
    // 1- Checking if post exists and not deleted
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post || (post && post.isDeleted)) throw new NotFoundExcpetion('Post not found');

    // 2- Checking if user owns the post
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
export async function remove(actorId: string, id: string) {
    // 1- Checking if post exists and not deleted
    const post = await prisma.post.findUnique({ where: { id: id } });
    if (!post || (post && post.isDeleted)) throw new NotFoundExcpetion('Post not found');

    // 2- Checking if user owns the post
    if (actorId !== post.userId) throw new UnauthorizedExcpetion('You don\'t have permission to edit this post');

    // 3- Soft deleting post
    await prisma.post.update({ where: { id }, data: { isDeleted: true } });
    post.isDeleted = true;

    return post;
}