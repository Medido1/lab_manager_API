import {prisma} from "../../lib/prisma.js";

export const getData = async (req, res, next) => {
  try {
    const {type} = req.params;
    const dataTable = await prisma.clientData.findMany({
      where: {type},
      orderBy: { number: 'asc' }
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
      payedSum, phoneNumber, endDate, sortie, user
    } = req.body

    const client = await prisma.clientData.create({
      data: {
        type,
        number,
        fullName,
        price,
        remaining: (price - payedSum).toFixed(2),
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

export const checkAsCompleted = async (req, res, next) => {
  const {id} = req.params;
  const {sortie} = req.body;

  try {
    await prisma.clientData.update({
      where: {id: parseInt(id, 10)},
      data: {sortie}
    })
    res.status(200).json({ message: 'Client updated' });
  } catch (error) {
    next(error)
  }
}

export const deleteClient = async (req, res, next) => {
  const {id} = req.params;

  try {
    await prisma.clientData.delete({
      where: {id: parseInt(id, 10)}
    });
    res.status(200).json({message: 'client deleted'});
  } catch (error) {
    next(error);
  }
}

export const editClient = async (req, res, next) => {
  const {fullName, price, payed, phoneNumber} = req.body

  const {id} = req.params;

  try {
    await prisma.clientData.update({
      where: {id: parseInt(id, 10)},
      data : {
        fullName, price, payed, phoneNumber
      }
    })
    res.status(202).json({message: "client updated"});
  } catch (error) {
    next(error)
  }
}

export const getAllClients = async (req, res, next) => {
  try {
    const data = await prisma.clientData.findMany();
    res.status(200).send(data)
  } catch (error) {
    next(error)
  }
}

