import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export const register = async (req, res) => {
  try {

    const {
      namaLengkap,
      email,
      password
    } = req.body;

    if (!namaLengkap || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Semua field wajib diisi"
      });
    }

    const existingUser =
      await prisma.profile.findUnique({
        where: {
          email
        }
      });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email sudah digunakan"
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );
    
    const user = await prisma.profile.create({
      data: {
        namaLengkap,
        email,
        password: hashedPassword
      }
    });

    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json({
    success: true,
    user: userWithoutPassword
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message
    });

  }
};

export const login = async (req, res) => {
  try {

    console.log("JWT SECRET =", process.env.JWT_SECRET);

    const {
      email,
      password
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email dan password wajib diisi"
      });
    }

    const user = await prisma.profile.findUnique({
      where: {
        email
      }
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Email atau password salah"
      });
    }

    const isPasswordValid =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Email atau password salah"
      });
    }

    const token = jwt.sign(
    {
        id: user.id,
        email: user.email,
        role: user.role
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "7d"
    }
    );

    const { password: _, ...userWithoutPassword } = user;

    res.json({
    success: true,
    message: "Login berhasil",
    token,
    user: userWithoutPassword
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message
    });

  }
};