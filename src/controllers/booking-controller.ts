import { AuthenticatedRequest } from "@/middlewares";
import bookingService from "@/services/booking-service";
import { NextFunction, Response } from "express";
import httpStatus from "http-status";

export async function getBooking(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response> {
    const { userId } = req as { userId: number };

    try {
        const getBooking = await bookingService.listBooking(userId);
        return res.status(httpStatus.OK).send(getBooking);
    } catch(error) {
        next(error);
    }
}