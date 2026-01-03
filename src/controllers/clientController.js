import {prisma} from "../../lib/prisma.js";

export const getData = async (req, res, next) => {
  try {
    const type = req.params;
    const dataTable = await prisma.clientData.findMany({
      where: {type}
    });
    res.status(200).send({dataTable})
  } catch (error) {
    next(error)
  }
}

export const addClient = async (req, res, next) => {
   try {
    const {
      type, number, fullName, price,
      payed, phoneNumber, endDate, sortie, user
    } = req.body

    const client = await prisma.clientData.create({
      data: {
        type,
        number,
        fullName,
        price,
        remaining: parseInt(price - payed),
        phoneNumber,
        endDate,
        sortie,
        user
      }
    })

    res.status(201).json({message: 'client created'})
  } catch (error) {
    next(error)
  }
}