import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import hotelsServices from '@/services/hotels-service';

export async function getHotels(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response> {
  const { userId } = req as { userId: number };

  try {
    const listHotels = await hotelsServices.getHotels(userId);
    return res.status(httpStatus.OK).send(listHotels);
  } catch (error) {
    next(error);
  }
}
