import { prisma } from "@/config";
import { Booking, Room } from "@prisma/client";

async function findBooking(userId: number): Promise<Booking & { Room: Room }> {
    return prisma.booking.findFirst({
        where: {
            userId,
        },
        include: {
            Room: true,
        },
    });
}

async function findRoomsWithBookings(roomId: number): Promise<Booking[]> {
    return prisma.booking.findMany({
        where: {
            roomId,
        }
    })
}

async function createBooking(userId: number, roomId: number): Promise<Booking> {
    return prisma.booking.create({
        data: {
            userId,
            roomId,
        },
    });
}

const bookigRepository = {
    findBooking,
    findRoomsWithBookings,
    createBooking,
};

export default bookigRepository;