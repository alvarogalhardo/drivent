import ticketRepositoy from '@/repositories/ticket-repository';
import { Enrollment, Ticket, TicketType } from '@prisma/client';
import { getTickets } from '@/controllers/tickets-controller';
import enrollmentRepository from '@/repositories/enrollment-repository';

async function getTypes(): Promise<TicketType[]> | null {
  const ticketTypes = await ticketRepositoy.getArrayOfTIcketTypes();
  if (!ticketTypes) return null;
  return ticketTypes;
}

async function getTicketsById(): Promise<Ticket> | null {
  const ticket = await ticketRepositoy.getTicket();
  if (!ticket) return null;
  return ticket;
}

const ticketServices = {
  getTypes,
  getTicketsById,
};

export default ticketServices;
