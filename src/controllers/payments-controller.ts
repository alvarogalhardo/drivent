import { AuthenticatedRequest } from "@/middlewares";
import { PaymentParams } from "@/protocols";
import paymentServices from "@/services/payments-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function postPayment(req:AuthenticatedRequest,res:Response){
    const paymentConfirmed = await paymentServices.makePayment(req.body as PaymentParams)
}