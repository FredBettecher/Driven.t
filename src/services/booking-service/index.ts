import { forbiddenError, notFoundError } from "@/errors";
import bookigRepository from "@/repositories/booking-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import roomsRepository from "@/repositories/room-repository";
import ticketsRepository from "@/repositories/tickets-repository";
import { Booking, TicketStatus } from "@prisma/client";

async function checkBusinessRule(userId: number, roomId: number) {
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
    if(!enrollment) throw notFoundError();

    const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
    if(!ticket) throw notFoundError();
    if(ticket.TicketType.isRemote || !ticket.TicketType.includesHotel || ticket.status !== TicketStatus.PAID) throw forbiddenError();

    const room = await roomsRepository.findRoom(roomId);
    if(!room) throw notFoundError();

    const roomWithBookings = await bookigRepository.findRoomsWithBookings(roomId);
    if(roomWithBookings.length >= room.capacity) throw forbiddenError();
    
    return;
}

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
    await checkBusinessRule(userId, roomId);

    const createBooking = await bookigRepository.createBooking(userId, roomId);

    return createBooking;
}

async function updateBooking(userId: number, roomId: number): Promise<Booking> {
    await checkBusinessRule(userId, roomId);

    const booking = await bookigRepository.findBooking(userId);
    if(!booking) throw forbiddenError();

    const updateBooking = await bookigRepository.updateBooking(booking.id, roomId);

    return updateBooking;
}

const bookingService = {
    listBooking,
    createBooking,
    updateBooking,
};

export default bookingService;