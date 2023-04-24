import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getHotelWithRoom, getHotels } from '@/controllers';

const hotelsRouter = Router();

hotelsRouter
    .all('*', authenticateToken)
    .get('/', getHotels)
    .get('/:id', getHotelWithRoom);

export { hotelsRouter };
