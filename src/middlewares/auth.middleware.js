import jwt from "jsonwebtoken";
import prismaClient from "../prisma.js";
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "thisissecretkey";
const authMiddleware = async (req, res, next) => {
  try {
    const token = req?.headers?.authorization?.split(" ")[1] ?? "";
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized.",
      });
    }
    const { id } = await jwt.verify(token, JWT_SECRET_KEY);
    const user = await prismaClient.user.findUnique({where:{id}});
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized.",
      });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized.",
    });
  }
};
export default authMiddleware;
