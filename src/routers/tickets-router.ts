import { getTickets, getTicketTypes, postTickets } from '@/controllers/tickets-controller';
import { authenticateToken, validateBody } from '@/middlewares';
import ticketSchema from '@/schemas/ticket-schemas';
import { Router } from 'express';

const ticketsRouter = Router();

ticketsRouter
  .use(authenticateToken)
  .get('/types', getTicketTypes)
  .get('/', getTickets)
  .post('/', validateBody(ticketSchema), postTickets);

export { ticketsRouter };
