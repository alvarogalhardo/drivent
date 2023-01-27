import { prisma } from '@/config';
import { TicketInsert } from '@/protocols';
import { Enrollment, Ticket, TicketType } from '@prisma/client';

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
    },
  });
  return data;
}

async function postTicket(post: TicketInsert): Promise<Ticket> {
  await prisma.ticket.create({
    data: {
      ticketTypeId: post.ticketTypeId,
      enrollmentId: post.enrollmentId,
      status: post.status,
    },
  });

  const data = await prisma.ticket.findFirst({
    where: {
      ticketTypeId: post.ticketTypeId,
    },
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
    },
  });
  return data;
}

async function getEnrollment(id: number): Promise<number> {
  const enrollment = await prisma.enrollment.findUnique({
    where: {
      userId: id,
    },
    select: {
      id: true,
    },
  });
  return enrollment.id;
}

const ticketRepositoy = {
  getArrayOfTIcketTypes,
  getTicket,
  postTicket,
  getEnrollment,
};

export default ticketRepositoy;
