import { notFoundError } from "@/errors";
import bookigRepository from "@/repositories/booking-repository";

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

const bookingService = {
    listBooking,
};

export default bookingService;