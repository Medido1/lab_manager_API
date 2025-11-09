import { Router } from "express";
import prisma from "../prismaClient.js";

const clientsRouter = Router();

clientsRouter.post('/client/add', async (req, res, next) => {
  try {
    const {
      type, number, name, price,
      payed, phone_number, endDate
    } = req.body

    const client = await prisma.clientData.create({
      data: {
        type,
        number,
        fullName: name,
        price,
        remaining: parseInt(price - payed),
        phoneNumber: phone_number,
        endDate
      }
    })

    res.status(201).json({message: 'client created'})
  } catch (error) {
    next(error)
  }
});

export default clientsRouter;