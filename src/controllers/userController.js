import bcrypt from "bcrypt";
import {prisma} from "../../lib/prisma.js";
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

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
};

export const userLogin = async (req, res, next) => {
  if (!JWT_SECRET) throw new Error("JWT_SECRET not defined in environment");
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const validPwd = await bcrypt.compare(password, user.password);
    if (!validPwd) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
    const { password: _, ...safeUser } = user;

    return res.json({ message: "Login successful", user: safeUser, token });
  } catch (err) {
    next(err);
  }
}

export const getCurrentUser = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where : {id: req.user.id},
      select: {
        id: true,
        username: true,
        approved: true,
      }
    })
    if (!user){
      return res.status(404).json({message: "User not found"})
    }
    res.json({user})
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
