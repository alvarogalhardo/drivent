import { prisma } from '@/config';
import { Payment, Ticket } from '@prisma/client';

async function getPayment(ticketId: number): Promise<Payment> {
  const data = await prisma.payment.findFirst({
    where: { ticketId },
  });
  return data
}

async function findUser(userId: number): Promise<number> | null {
  const user = await prisma.enrollment.findUnique({
    where: {
      userId: userId,
    },
    select: {
      id: true,
    },
  });
  return user.id;
}


async function findTicket(ticketId: number): Promise<Ticket> | null{
  const ticket = await prisma.ticket.findUnique({
    where: {
      id: ticketId,
    },
  });
  return ticket;
}

const paymentRepository = {
  getPayment,
  findUser,
  findTicket,
};

export default paymentRepository;
