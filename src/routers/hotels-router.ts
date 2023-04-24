import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getHotelWithRoom, getHotels } from '@/controllers';

const hotelsRouter = Router();

hotelsRouter
    .all('*', authenticateToken)
    .get('/', getHotels)
    .get('/:hotelId', getHotelWithRoom);

export { hotelsRouter };
