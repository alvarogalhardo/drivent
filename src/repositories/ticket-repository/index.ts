import { prisma } from '@/config';
import { Ticket, TicketType } from '@prisma/client';

async function getArrayOfTIcketTypes(): Promise<TicketType[]> {
  const data = await prisma.ticketType.findMany();
  return data;
}

async function getTicket(): Promise<Ticket> {
  const data = await prisma.ticket.findFirst({
    include: {
      TicketType: {
        select: {
          id: true,
          name: true,
          price: true,
          isRemote: true,
          includesHotel: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    }
  });
  return data;
}

const ticketRepositoy = {
  getArrayOfTIcketTypes,
  getTicket,
};

export default ticketRepositoy;
