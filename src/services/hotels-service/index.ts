import { Hotel, TicketStatus } from '@prisma/client';
import { notFoundError, paymentRequiredError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import hotelsRepository from '@/repositories/hotels-repository';
import ticketsRepository from '@/repositories/tickets-repository';

async function getHotels(userId: number): Promise<Hotel[]> {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError;

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (ticket) throw notFoundError;
  if (ticket.status !== TicketStatus.PAID || ticket.TicketType.isRemote === true) throw paymentRequiredError;

  const hotels = await hotelsRepository.findHotels();
  if (!hotels) throw notFoundError;

  return hotels;
}

const hotelsServices = {
  getHotels,
};

export default hotelsServices;
