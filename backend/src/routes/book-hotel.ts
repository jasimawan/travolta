import express, { Request, Response } from "express";
import { validateRequest } from "../middlewares";
import { body } from "express-validator";
import cache from "memory-cache";
import { BadRequestError } from "../errors";
import { CACHE_DURATION } from "../utils/constants";

const router = express.Router();

router.post(
  "/api/hotels",
  [body("id").isString().withMessage("Hotel id must be a valid string")],
  validateRequest,
  async (req: Request, res: Response) => {
    const { id } = req.body;
    const hotel = cache.get(id);

    if (hotel) {
      throw new BadRequestError("Hotel already booked.");
    }

    cache.put(id, req.body, CACHE_DURATION);

    res.status(201).send({ message: "Hotel booked successfully." });
  }
);

export { router as bookHotelRouter };
