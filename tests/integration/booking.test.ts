import app, { init } from "@/app";
import { cleanDb, generateValidToken } from "../helpers";
import supertest from "supertest";
import httpStatus from "http-status";
import { createBooking, createEnrollmentWithAddress, createTicket, createTicketType, createTicketTypeWithHotel, createUser } from "../factories";
import { TicketStatus } from "@prisma/client";
import { createHotel, createRoom } from "../factories/hotels-factory";

beforeAll(async () => {
    await init();
});

beforeEach(async () => {
    await cleanDb();
});

const server = supertest(app);

describe('GET /booking', () => {
    describe('when token is invalid', () => {
        it('should return with status 401', async () => {
            const response = await server.get('/booking');

            expect(response.status).toBe(httpStatus.UNAUTHORIZED);
        });
    });

    describe('when token is valid', async () => {
        it('should return with status 404 if user has no booking', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);

            const response = await server.get('/booking').set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(httpStatus.NOT_FOUND);
        });

        it('should return with status 200 and the booking data', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const enrollment = await createEnrollmentWithAddress(user);
            const ticketType = await createTicketTypeWithHotel();
            await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
            const hotel = await createHotel();
            const room = await createRoom(hotel.id);
            const booking = await createBooking(user.id, room.id);
            const result = {
                id: booking.id,
                Room: {
                    ...booking.Room,
                    createdAt: booking.Room.createdAt.toISOString(),
                    updatedAt: booking.Room.updatedAt.toISOString(),
                },
            };

            const response = await server.get('/booking').set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(httpStatus.OK);
            expect(response.body).toEqual({
                ...result,
            });
        });
    });
});