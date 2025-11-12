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

clientsRouter.delete('/:id/delete', async (req, res, next) => {
  const {id} = req.params;

  try {
    await prisma.clientData.delete({
      where: {id: parseInt(id, 10)}
    });
    res.status(200).json({message: 'client deleted'});
  } catch (error) {
    next(error);
  }
});

clientsRouter.post('/:id/update', async (req, res, next) => {
  const {
    type, number, fullName, price,
    payed, phoneNumber, endDate
  } = req.body

  const {id} = req.params;

  try {
   await prisma.clientData.update({
      where: {id: parseInt(id, 10)},
      data: {
        type, number, fullName, price,
        payed, phoneNumber, endDate
      }
  })

  res.status(202).json({message: "client updated"});
  } catch (error) {
    next(error)
  }
});

export default clientsRouter;