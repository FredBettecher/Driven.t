import { Hotel, Room } from '@prisma/client';
import { prisma } from '@/config';

async function findHotels(): Promise<Hotel[]> {
  return prisma.hotel.findMany();
}

async function findHotelWithRoom(hotelId: number): Promise<Hotel & { Rooms: Room[]; }> {
  return prisma.hotel.findUnique({
    where: {
      id: hotelId,
    },
    include: {
      Rooms: true,
    },
  });
}

const hotelsRepository = {
  findHotels,
  findHotelWithRoom,
};

export default hotelsRepository;
