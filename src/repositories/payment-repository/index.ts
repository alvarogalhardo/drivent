import { prisma } from '@/config';
import { Payment, Ticket } from '@prisma/client';

async function postPayment(payment: PostTicket): Promise<Payment> {
  const data = await prisma.payment.create({
    data: {
      ticketId: payment.ticketId,
      value: payment.value,
      cardIssuer: payment.cardIssuer,
      cardLastDigits: payment.cardLastDigits,
    },
  });
  return data;
}

async function updateTicket(ticketId: number): Promise<boolean> | null {
  const updated = await prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: 'PAID',
    },
  });
  return true;
}

type PostTicket = {
  ticketId: number;
  value: number;
  cardIssuer: string;
  cardLastDigits: string;
};

async function getPayment(ticketId: number): Promise<Payment> {
  const data = await prisma.payment.findFirst({
    where: { ticketId },
  });
  return data;
}

async function findTicket(ticketId: number): Promise<Ticket> | null {
  const ticket = await prisma.ticket.findUnique({
    where: {
      id: ticketId,
    },
  });
  return ticket;
}

async function findValue(ticketId: number): Promise<number> {
  const value = await prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
    include: {
      TicketType: {
        select: {
          price: true,
        },
      },
    },
  });
  const data = value.TicketType.price;
  return data;
}

async function findUser(userId: number, ticketId: number): Promise<number> {
  const enrollment = await prisma.ticket.findUnique({
    where: {
      id: ticketId,
    },
    include: {
      Enrollment: {
        select: {
          userId: true,
        },
      },
    },
  });

  return enrollment.Enrollment.userId;
}

const paymentRepository = {
  getPayment,
  findTicket,
  postPayment,
  findValue,
  updateTicket,
  findUser,
};

export default paymentRepository;
