import { PaymentParams } from '@/protocols';
import Joi from 'joi';

const paymentSchema = Joi.object<PaymentParams>({
  ticketId: Joi.number().required(),
  cardData: {
    issuer: Joi.string().valid('VIsa', 'MASTERCARD').required(),
    number: Joi.string().creditCard().required().length(3),
    name: Joi.string().required(),
    expirationDate: Joi.date().required(),
    cvv: Joi.string().length(3).required(),
  },
});

export default paymentSchema
