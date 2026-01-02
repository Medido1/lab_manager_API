import bcrypt from "bcrypt";
import {prisma} from "../../lib/prisma.js";

export const registerUser = async (req, res, next) => {
  try {
    const {username, password} = req.body;
    const existingUser = await prisma.user.findUnique({ where: { username } });

    if (existingUser) {
      const error = new Error("Username already exists");
      error.status = 400;
      return next(error);
    }
    const hashedPwd = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPwd,
        approved: false,
      },
    });
    res.status(201).json({message: "User Created", user})
  } catch (error) {
    next(error);
  }
}
