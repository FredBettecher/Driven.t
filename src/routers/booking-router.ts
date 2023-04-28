import { getBooking, postBooking } from "@/controllers";
import { authenticateToken, validateBody } from "@/middlewares";
import { postBookingSchema } from "@/schemas";
import { Router } from "express";

const bookingRouter = Router();

bookingRouter
    .all('*', authenticateToken)
    .get('/', getBooking)
    .post('/', validateBody(postBookingSchema), postBooking);

export { bookingRouter };