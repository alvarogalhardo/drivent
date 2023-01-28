import { PaymentParams } from '@/protocols';
import Joi from 'joi';

const paymentSchema = Joi.object<PaymentParams>({
  ticketId: Joi.number().required(),
  cardData: Joi.object({
    issuer: Joi.string().required(),
    number: Joi.string().required().length(15),
    name: Joi.string().required(),
    expirationDate: Joi.string().required().min(6).max(7),
    cvv: Joi.string().length(3).required(),
  }).required(),
});

export default paymentSchema
