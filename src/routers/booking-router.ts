import { getBooking, postBooking, updateBooking } from "@/controllers";
import { authenticateToken, validateBody, validateParams } from "@/middlewares";
import { postBookingSchema, updateBookingSchema } from "@/schemas";
import { Router } from "express";

const bookingRouter = Router();

bookingRouter
    .all('*', authenticateToken)
    .get('/', getBooking)
    .post('/', validateBody(postBookingSchema), postBooking)
    .put('/:bookingId', validateParams(updateBookingSchema), updateBooking);

export { bookingRouter };