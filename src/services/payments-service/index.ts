import { Payment } from '@prisma/client';
import { ApplicationError, PaymentParams } from '@/protocols';
import paymentRepository from '@/repositories/payment-repository';
import { notFoundError } from '@/errors';

async function makePayment(payment: PaymentParams) {
  const ticket = await paymentRepository.findTicket(payment.ticketId);
  if (!ticket) return null;
  const value = await paymentRepository.findValue(payment.ticketId);
  const { ticketId, cardData } = payment;
  const { issuer, number } = cardData;
  const cardLastDigits = number.slice(number.length - 4, number.length);
  const postObj = {
    ticketId,
    cardIssuer: issuer,
    cardLastDigits,
    value,
  };
  const posted = await paymentRepository.postPayment(postObj);
  const updated = await paymentRepository.updateTicket(ticketId);
  if (!updated) return false;
  return posted;
}

async function checkUser(userId: number, ticketId: number): Promise<boolean> {
  const userFound = await paymentRepository.findUser(userId, ticketId);
  if (userId !== userFound) {
    return false;
  } else {
    return true;
  }
}

async function getPaymentsByQuery(ticketId: number): Promise<Payment | ApplicationError | null> {
  const ticket = await paymentRepository.findTicket(ticketId);

  if (!ticket) return null;
  const payment = await paymentRepository.getPayment(ticketId);

  if (payment === null) throw notFoundError();
  return payment;
}

const paymentServices = {
  makePayment,
  getPaymentsByQuery,
  checkUser,
};

export default paymentServices;
