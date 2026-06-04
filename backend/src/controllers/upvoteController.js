import prisma from "../lib/prisma.js";

export const upvoteReport = async (req, res) => {
  try {

    const { id } = req.params;

    const existingUpvote =
      await prisma.upvote.findFirst({
        where: {
          reportId: Number(id),
          userId: req.user.id
        }
      });

    if (existingUpvote) {
      return res.status(400).json({
        success: false,
        message: "Report sudah di-upvote"
      });
    }

    const upvote = await prisma.upvote.create({
      data: {
        reportId: Number(id),
        userId: req.user.id
      }
    });

    res.status(201).json({
      success: true,
      upvote
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message
    });

  }
};

export const removeUpvote = async (req, res) => {
  try {

    const { id } = req.params;

    const existingUpvote =
      await prisma.upvote.findFirst({
        where: {
          reportId: Number(id),
          userId: req.user.id
        }
      });

    if (!existingUpvote) {
      return res.status(404).json({
        success: false,
        message: "Upvote tidak ditemukan"
      });
    }

    await prisma.upvote.delete({
      where: {
        id: existingUpvote.id
      }
    });

    res.json({
      success: true,
      message: "Upvote berhasil dibatalkan"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message
    });

  }
};