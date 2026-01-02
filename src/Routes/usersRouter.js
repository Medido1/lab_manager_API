import {Router} from "express";
import bcrypt from "bcrypt";
import {prisma} from "../../lib/prisma.js";

const usersRouter = Router();

usersRouter.post('/register', async (req, res, next) => {
  try {
    const {username, password} = req.body;
    const existingUser = await prisma.user.findUnique({where : {username}})

    if (existingUser) {
      const error = new Error("Username alredy exists");
      error.status = 400;
      return next(error)
    }

    const hashedPwd = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data : {
        username,
        password: hashedPwd,
      }
    })
    res.status(201).json({message: "User created", user})
  } catch (error) {
      next(error)
  }
})

export default usersRouter;