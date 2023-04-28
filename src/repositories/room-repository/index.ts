import { prisma } from "@/config";
import { Room } from "@prisma/client";

async function findRoom(roomId: number): Promise<Room> {
    return prisma.room.findUnique({
        where: {
            id: roomId,
        },
    });
}

const roomsRepository = {
    findRoom,
};

export default roomsRepository;