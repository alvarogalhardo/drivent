import Joi from 'joi';
import { TicketSchema } from '@/protocols';

const ticketSchema = Joi.object<TicketSchema>({
  ticketTypeId: Joi.number().required(),
});

export default ticketSchema;
