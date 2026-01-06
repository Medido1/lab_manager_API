import {prisma} from "../../lib/prisma.js";

const createClient = async (clientData, tx = prisma) => {
  const currentYear = new Date().getFullYear();

  const {
    type, fullName, price,
    payedSum, phoneNumber, endDate, sortie, user
  } = clientData;

  const maxNumber = await tx.clientData.aggregate({
    _max: { number: true },
    where: {
      type,
      createdAt: {
        gte: new Date(currentYear, 0, 1),
        lte: new Date(currentYear, 11, 31, 23, 59, 59),
      },
    },
  });

  const clientNumber = (maxNumber._max.number || 0) + 1;

  return tx.clientData.create({
    data: {
      type,
      fullName,
      number: clientNumber,
      price,
      remaining: Number(price - payedSum),
      phoneNumber,
      endDate,
      sortie,
      user,
    },
  });
};

export const addClient = async (req, res, next) => {
  try {
    await createClient(req.body);
    res.status(201).json({ message: 'Client created' });
  } catch (error) {
    next(error);
  }
};

export const addMultipleClients = async (req, res, next) => {
  const clients = req.body;

  try {
    await prisma.$transaction(async (tx) => {
      for (const clientData of clients) {
        await createClient(clientData, tx);
      }
    });

    res.status(201).json({ message: 'Clients created successfully' });
  } catch (error) {
    next(error);
  }
};

export const getData = async (req, res, next) => {
  try {
    const {type} = req.params;
    const dataTable = await prisma.clientData.findMany({
      where: {type},
      orderBy:  [
        { createdAt: 'asc' },
        { number: 'asc' }]
    });
    res.status(200).send({dataTable})
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

export const importData = async (req, res, next) => {
  try {
    const newData = req.body; 
    await prisma.clientData.deleteMany({});

    await prisma.clientData.createMany({
      data: newData.map(({ id, ...rest }) => rest) // Prisma will auto-generate IDs
    });

    res.status(200).json({ message: "Data replaced successfully" });
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: "Failed to replace data" });
  }
}
