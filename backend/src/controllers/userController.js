import prisma from "../lib/prisma.js";

export const getAllUsers = async (req, res) => {
  try {

    const users = await prisma.profile.findMany({
      select: {
        id: true,
        namaLengkap: true,
        email: true,
        role: true,
        avatarUrl: true,
        createdAt: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    res.json({
      success: true,
      users
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message
    });

  }
};