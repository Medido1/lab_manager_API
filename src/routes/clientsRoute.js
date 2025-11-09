import { Router } from "express";
import prisma from "../prismaClient.js";

const clientsRouter = Router();

clientsRouter.post('/add', async (req, res, next) => {
  try {
    const {
      type, number, fullName, price,
      payed, phoneNumber, endDate
    } = req.body

    const client = await prisma.clientData.create({
      data: {
        type,
        number,
        fullName,
        price,
        remaining: parseInt(price - payed),
        phoneNumber,
        endDate
      }
    })

    res.status(201).json({message: 'client created'})
  } catch (error) {
    next(error)
  }
});

clientsRouter.get('/:type', async (req, res, next) => {
  try {
    const {type} = req.params
    const tests = await prisma.clientData.findMany({
      where: {type}
    });
    res.status(200).send({tests})
  } catch (error) {
    next(error)
  }
});

export default clientsRouter;