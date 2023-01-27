import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketRepositoy from '@/repositories/ticket-repository';
import { Ticket, TicketType } from '@prisma/client';
import { TicketInsert,Status } from '@/protocols';
import { notFoundError } from '@/errors';

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

async function postTickets(ticketTypeId: number, userId: number): Promise<Ticket> | null {
  const enrollmentId = await ticketRepositoy.getEnrollment(userId);
  if(!enrollmentId) throw notFoundError()
  const postObject:TicketInsert = {
    ticketTypeId,
    enrollmentId: enrollmentId,
    status: Status.reserved
  }
  const posted = await ticketRepositoy.postTicket(postObject);
  return posted
}

const ticketServices = {
  getTypes,
  getTicketsById,
  postTickets,
};

export default ticketServices;
