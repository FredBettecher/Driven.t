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

export async function getHotelWithRoom(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response> {
  const { userId } = req as { userId: number };
  const { hotelId } = req.params as { hotelId: string } ;

  try {
    const hotelWithRooms = await hotelsServices.getHotelWithRooms(userId, parseInt(hotelId));
    return res.status(httpStatus.OK).send(hotelWithRooms);
  } catch(error) {
    next(error);
  }
}
