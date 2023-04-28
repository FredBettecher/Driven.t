import { forbiddenError, notFoundError, paymentRequiredError } from "@/errors";
import bookigRepository from "@/repositories/booking-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import roomsRepository from "@/repositories/room-repository";
import ticketsRepository from "@/repositories/tickets-repository";
import { Booking, TicketStatus } from "@prisma/client";

async function listBooking(userId: number) {
    const booking = await bookigRepository.findBooking(userId);
    if(!booking) throw notFoundError();

    const response = {
        id: booking.id,
        Room: {
            ...booking.Room,
        },
    };

    return response;
}

async function createBooking(userId: number, roomId: number): Promise<Booking> {
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
    if(!enrollment) throw notFoundError();

    const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
    if(!ticket) throw notFoundError();
    if(ticket.TicketType.isRemote || !ticket.TicketType.includesHotel || ticket.status !== TicketStatus.PAID) throw forbiddenError();

    const room = await roomsRepository.findRoom(roomId);
    if(!room) throw notFoundError();

    const roomWithBookings = await bookigRepository.findRoomsWithBookings(roomId);
    if(roomWithBookings.length >= room.capacity) throw forbiddenError();

    const createBooking = await bookigRepository.createBooking(userId, roomId);

    return createBooking;
}

const bookingService = {
    listBooking,
    createBooking,
};

export default bookingService;