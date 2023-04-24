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
    if(error.name === 'PaymentRequiredError') {
      return res.status(httpStatus.PAYMENT_REQUIRED).send(error);
    }
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}

export async function getHotelWithRoom(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response> {
  const { userId } = req as { userId: number };
  const hotelId = Number(req.params);

  try {
    const hotelWithRoom = await hotelsServices.getHotelWithRoom(userId, hotelId);
    return res.status(httpStatus.OK).send(hotelWithRoom);
  } catch(error) {
    if(error.name === 'PaymentRequiredError') {
      return res.status(httpStatus.PAYMENT_REQUIRED).send(error);
    }
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}
