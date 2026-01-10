import { Request, Response } from "express";
import { redisClient } from "../redis/redis.client.js";

export function convertEndpointToKey(endpoint: string, userId: string | null = null) {
  // 1- Remove the first slath
  endpoint = endpoint.slice(1);

  // 2- Replace slahses with :
  endpoint = endpoint.replaceAll('/', ':');

  // 3- Replace ? and & with :
  endpoint = endpoint.replaceAll('?', ':');
  endpoint = endpoint.replaceAll('&', ':');

  // 4- Appending user id is provided
  if (userId) endpoint += `:${userId}`;

  return endpoint
}

async function findCache(req: Request) {
  let key = convertEndpointToKey(req.originalUrl);
  let cacheResult = await redisClient.get(key)
  if (cacheResult) return cacheResult;

  key = convertEndpointToKey(req.originalUrl, req.user?.userId);
  cacheResult = await redisClient.get(key)
  if (cacheResult) return cacheResult;

  return false;
}

function buildHttpPath(method: string, endpoint: string) {
  return `${method.toUpperCase()} ${endpoint}`;
}

const perUserCache: string[] = [];

export async function checkCache(req: Request, res: Response, next: Function) {

  // 1- Gte cache
  const cache = await findCache(req);

  // 2- If exists return it
  if (cache) {
    res.setHeader('X-Cache', 'HIT');
    return res.json({
      success: true,
      message: "Retreived successfully",
      data: cache
    });
  }

  // 3- If not exists continue the request
  next();
}