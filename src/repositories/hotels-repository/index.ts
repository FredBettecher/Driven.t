import { Hotel, Room } from '@prisma/client';
import { prisma } from '@/config';

async function findHotels(): Promise<Hotel[]> {
  return prisma.hotel.findMany();
}

async function findHotelWithRooms(hotelId: number): Promise<Hotel & { Rooms: Room[]; }> {
  return prisma.hotel.findUnique({
    where: {
      id: hotelId,
    },
    include: {
      Rooms: true,
    }
  });
}

const hotelsRepository = {
  findHotels,
  findHotelWithRooms,
};

export default hotelsRepository;
