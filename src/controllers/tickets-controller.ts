import { AuthenticatedRequest } from '@/middlewares';
import { Ticket } from '@prisma/client';
import ticketServices from '@/services/tickets-service';
import { Response } from 'express';
import httpStatus from 'http-status';

export async function getTicketTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const data = await ticketServices.getTypes();
    if (data === null) return res.sendStatus(httpStatus.NOT_FOUND);
    return res.status(httpStatus.OK).send(data);
  } catch (err) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  try {
    const data: Ticket = await ticketServices.getTicketsById();
    if (data===null) return res.sendStatus(httpStatus.NOT_FOUND)
    return res.status(200).send(data)
  } catch (err) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
