import { postPayment } from "@/controllers/payments-controller";
import { authenticateToken, validateBody } from "@/middlewares";
import paymentSchema from "@/schemas/payment-schemas";
import { Router } from "express";

const paymentsRouter = Router();

paymentsRouter
    .all("/*",authenticateToken)
    .post("/payments/process",validateBody(paymentSchema),postPayment)
    

export {paymentsRouter}