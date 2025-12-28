import prisma from "../../../core/databaseClient/prismaClient/prismaClient.js";
import { NotFoundExcpetion } from "../../../core/errors/NotFoundExcpetion.js";
import { UnauthorizedExcpetion } from "../../../core/errors/UnauthorizedExcpetion copy.js";

/**
 * Fetches all Post data.
 */
export async function getAll(cursor: string, limit: number = 10) {
    const query: any = {
        take: limit + 1,
        orderBy: { id: 'asc' }
    }
    if (cursor) query.cursor = { id: cursor };

    const posts = await prisma.post.findMany(query);

    let hasNextPage: boolean = false;
    let nextCursor: string | null = null;
    if (posts.length > limit) {
        hasNextPage = true;
        nextCursor = posts[limit].id;
        posts.pop();
    }

    return {
        posts, pagination: { hasNextPage, nextCursor, count: posts.length }
    };
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