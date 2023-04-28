import { prisma } from "@/config";
import faker from "@faker-js/faker";
import { Booking, Room } from "@prisma/client";

export async function createBooking(userId: number, roomId: number): Promise<Booking & { Room: Room }> {
    return prisma.booking.create({
        data: {
            userId: userId,
            roomId: roomId
        },
        include: {
            Room: true,
        },
    });
}