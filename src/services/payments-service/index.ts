import { Payment } from "@prisma/client";
import { ApplicationError, PaymentParams } from "@/protocols";
import paymentRepository from "@/repositories/payment-repository";
import { notFoundError } from "@/errors";



async function makePayment (payment: PaymentParams){
    
}

async function getPaymentsByQuery(ticketId:number):Promise<Payment | ApplicationError|null> {
    const ticket = await paymentRepository.findTicket(ticketId);
    
    if(!ticket) return null;  
    const payment = await paymentRepository.getPayment(ticketId);
    
    if(payment === null) throw notFoundError()
    return payment
}

const paymentServices = {
    makePayment,
    getPaymentsByQuery
}

export default paymentServices;