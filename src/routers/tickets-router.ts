import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter
    .use(authenticateToken)
    


export {ticketsRouter}