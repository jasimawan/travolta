import express, { Request, Response } from "express";
import axiosInstance from "../axios-intercepter";
import cache from "memory-cache";
import { query } from "express-validator";
import { cacheHotels } from "../middlewares/caching-hotels";
import { CACHE_DURATION } from "../utils/constants";
import { validateRequest } from "../middlewares";
import { NotFoundError } from "../errors";

const router = express.Router();

router.get(
  "/api/hotels",
  [
    query("location").not().isEmpty().withMessage("Location must be provided"),
    query("checkin")
      .not()
      .isEmpty()
      .withMessage("Checkin date must be provided"),
    query("checkout")
      .not()
      .isEmpty()
      .withMessage("Checkout date must be provided"),
    query("adults")
      .not()
      .isEmpty()
      .withMessage("Adults number must be provided"),
    query("page").not().isEmpty().withMessage("Page number must be provided"),
  ],
  validateRequest,
  cacheHotels,
  async (req: Request, res: Response) => {
    try {
      const response = await axiosInstance.get("/search-location", {
        params: req.query,
      });

      if (!response.data) {
        throw new NotFoundError();
      }

      const cacheKey = Object.keys(req.query)
        .map((key) => req.query[key])
        .filter((param) => param !== undefined)
        .join("_");
      cache.put(cacheKey, response.data.results, CACHE_DURATION);
      return res.status(200).send(response.data.results);
    } catch (e: any) {
      throw new Error(e);
    }
  }
);

export { router as getHotelsRouter };
