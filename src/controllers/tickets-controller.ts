import { AuthenticatedRequest } from '@/middlewares';
import { Ticket, TicketType } from '@prisma/client';
import ticketServices from '@/services/tickets-service';
import { Response } from 'express';
import httpStatus from 'http-status';
import { TicketSchema } from '@/protocols';

export async function getTicketTypes(req: AuthenticatedRequest, res: Response): Promise<Response<TicketType>> {
  try {
    const data = await ticketServices.getTypes();
    if (data === null) return res.sendStatus(httpStatus.NOT_FOUND);
    return res.status(httpStatus.OK).send(data);
  } catch (err) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getTickets(req: AuthenticatedRequest, res: Response): Promise<Response<Ticket>> {
  try {
    const data: Ticket = await ticketServices.getTicketsById();
    if (data === null) return res.sendStatus(httpStatus.NOT_FOUND);
    return res.status(200).send(data);
  } catch (err) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function postTickets(req: AuthenticatedRequest, res: Response): Promise<Response<Ticket>> {
  const { ticketTypeId } = req.body as TicketSchema;
  const userId = req.userId;
  try {
    if (!ticketTypeId) return res.sendStatus(httpStatus.BAD_REQUEST);
    const data = await ticketServices.postTickets(ticketTypeId, userId);
    if (data === null) return res.sendStatus(httpStatus.NOT_FOUND);
    return res.status(201).send(data);
  } catch (err) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
