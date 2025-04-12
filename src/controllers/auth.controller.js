import { loginValidation, signupValidation } from "../utils/validate.user.js";
import prismaClient from "../prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { CustomError } from "../utils/customError.js";
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "thisissecretkey";
///////////////Hash Password///////////////////////////
const hashPassword = async (password) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (err) {
    return "";
  }
};
//////////////////////Compare Password////////////////////
const comparePassword = async (password, hashPassword) => {
  try {
    return await bcrypt.compare(password, hashPassword);
  } catch (err) {
    return false;
  }
};
//////////////////////////////////Generate Token///////////////
const generateJwtToken = async (payload) => {
  try {
    return await jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "1d" });
  } catch (err) {
    return "";
  }
};
////////////////////////////User SignUp//////////////////////

export const signUp = async (req, res, next) => {
  try {
    if (!req?.body || Object.keys(req.body).length === 0) {
      throw new CustomError("No data provided. Request body cannot be empty.", 400);
    }

    const { error } = await signupValidation(req.body);
    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }

    const { email, password } = req.body;

    const userAlreadyExists = await prismaClient.user.findFirst({
      where: { email },
    });

    if (userAlreadyExists) {
      throw new CustomError("This email is already registered.", 400);
    }

    const newUser = await prismaClient.user.create({
      data: {
        email,
        password: await hashPassword(password),
      },
    });

    delete newUser.password;

    return res.status(201).json({
      success: true,
      message: "User created successfully.",
      data: newUser,
    });

  } catch (err) {
    next(err); // Pass errors to the global error handler
  }
};


////////////////////////User Login////////////////////////////////
export const login = async (req, res, next) => {
  try {
    if (!req?.body || Object.keys(req.body).length === 0) {
      throw new CustomError("No data provided. Request body cannot be empty.", 400);
    }

    const { error } = await loginValidation(req.body);
    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }

    const { email, password } = req.body;
    const user = await prismaClient.user.findFirst({ where: { email } });
    if (!user) {
      throw new CustomError("This email is not registered.", 400);
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      throw new CustomError("Invalid credentials.", 401);
    }

    const payload = { id: user.id, role: "user" };
    const token = await generateJwtToken(payload);

    delete user.password;

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      data: user,
    });

  } catch (err) {
    next(err); // pass error to middleware
  }
};

