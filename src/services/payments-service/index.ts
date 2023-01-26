import { Payment } from "@prisma/client";
import { PaymentParams } from "@/protocols";

async function makePayment (payment: PaymentParams){
    
}


const paymentServices = {
    makePayment
}

export default paymentServices;