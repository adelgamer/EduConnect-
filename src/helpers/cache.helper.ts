// import { Request } from "express";
// import { convertEndpointToKey } from "../../core/middlewares/cacheMiddleware.js";
// import { redisClient } from "../../core/redis/redis.client.js";

// export function setCache(req: Request, isPerUserCache: boolean = false, data: any, expiration: number | null = null) {
//   const key = isPerUserCache ? convertEndpointToKey(req.originalUrl, req.user!.userId) : convertEndpointToKey(req.originalUrl);
//   if (expiration) redisClient.setEx(key, expiration, JSON.stringify(data));
//   else redisClient.set(key, JSON.stringify(data));
// }

// export async function deleteCache(req: Request, isPerUserCache: boolean = false) {
//   const key = isPerUserCache ? convertEndpointToKey(req.originalUrl, req.user!.userId) : convertEndpointToKey(req.originalUrl);
//   await redisClient.unlink(key);
// }