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

const bookigRepository = {
    findBooking,
};

export default bookigRepository;