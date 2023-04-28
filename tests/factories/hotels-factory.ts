import faker from '@faker-js/faker';
import { Booking, Hotel, Room } from '@prisma/client';
import { prisma } from '@/config';

export async function createHotel(): Promise<Hotel> {
  return prisma.hotel.create({
    data: {
      name: faker.lorem.word(),
      image: faker.image.imageUrl(),
    },
  });
}

export async function createRoom(hotelId: number): Promise<Room & { Booking: Booking[] }> {
  return prisma.room.create({
    data: {
      name: faker.lorem.word(),
      capacity: 1,
      hotelId: hotelId,
    },
    include: {
      Booking: true,
    },
  });
}