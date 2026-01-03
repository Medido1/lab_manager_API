import {prisma} from "../../lib/prisma.js";

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