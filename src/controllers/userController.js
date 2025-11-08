import bcrypt from "bcrypt";
import prisma from "../prismaClient.js";
import passport from "../config/passport.js";
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
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({message: info.message})
    }
    const token = jwt.sign(
      {id: user.id},
      JWT_SECRET,
      {expiresIn: '1d'}
    );
    const {password, ...safeUser} = user;
    return res.json({
      message: "login successful",
      user: safeUser,
      token: token
    })
  })(req, res, next)
};

// Middleware to verify the token:
export const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(' ')[1];
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403);
    req.user = decoded;
    next();
  })
};

export const verifyToken = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {AND: [
        {id: req.user.id},
        {approved: true}
      ]},
      select: {
        id: true,
        username: true,
        approved: true,
        password:false
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