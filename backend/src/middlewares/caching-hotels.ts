import { Request, Response, NextFunction } from "express";
import cache from "memory-cache";

export const cacheHotels = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cacheKey = Object.keys(req.query)
    .map((key) => req.query[key])
    .filter((param) => param !== undefined)
    .join("_");

  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    console.log("Returning from cache.");
    return res.status(200).json(cachedData);
  }

  next();
};
