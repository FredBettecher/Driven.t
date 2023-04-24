import { Hotel, TicketStatus, Room } from '@prisma/client';
import { notFoundError, paymentRequiredError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import hotelsRepository from '@/repositories/hotels-repository';
import ticketsRepository from '@/repositories/tickets-repository';

async function getHotels(userId: number): Promise<Hotel[]> {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw notFoundError();
  if (ticket.status !== TicketStatus.PAID || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) throw paymentRequiredError();

  const hotels = await hotelsRepository.findHotels();
  if (!hotels || hotels.length === 0) throw notFoundError();

  return hotels;
}

async function getHotelWithRoom(userId: number, hotelId: number): Promise<Hotel & { Rooms: Room[]; }> {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw notFoundError();
  if (ticket.status !== TicketStatus.PAID || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) throw paymentRequiredError();

  const hotelWithRoom = await hotelsRepository.findHotelWithRoom(hotelId);
  if (!hotelWithRoom) throw notFoundError();

  return hotelWithRoom;
}

const hotelsServices = {
  getHotels,
  getHotelWithRoom,
};

export default hotelsServices;
