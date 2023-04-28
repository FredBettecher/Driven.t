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

export async function postBooking(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response> {
    const { userId } = req as { userId: number };
    const { roomId } = req.body as { roomId: number };

    try {
        const postBooking = await bookingService.createBooking(userId, roomId);
        return res.status(httpStatus.OK).send({ bookingId: postBooking.id });
    } catch(error) {
        next(error);
    }
}

export async function updateBooking(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response> {
    const { userId } = req as { userId: number };
    const { roomId } = req.body as { roomId: number };

    try {
        const updateBooking = await bookingService.updateBooking(userId, roomId);
        return res.status(httpStatus.OK).send({ bookingId: updateBooking.id });
    } catch(error) {
        next(error);
    }
}