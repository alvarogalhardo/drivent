import { AuthenticatedRequest } from "@/middlewares";
import { PaymentParams } from "@/protocols";
import paymentServices from "@/services/payments-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function postPayment(req:AuthenticatedRequest,res:Response){
    const paymentConfirmed = await paymentServices.makePayment(req.body as PaymentParams)
}

export async function getPayments(req:AuthenticatedRequest,res:Response){
    const ticketId = req.query.ticketId;
    if(!ticketId) return res.sendStatus(httpStatus.BAD_REQUEST)
    try{
    const data = await paymentServices.getPaymentsByQuery(Number(ticketId));    
    if(data === null) return res.sendStatus(httpStatus.NOT_FOUND)
    return res.status(200).send(data)
    } catch(err){
        return res.sendStatus(httpStatus.UNAUTHORIZED)
    }
}