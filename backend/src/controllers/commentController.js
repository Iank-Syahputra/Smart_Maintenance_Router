import prisma from "../lib/prisma.js";

export const createComment = async (req, res) => {
  try {

    const { id } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({
        success: false,
        message: "Komentar wajib diisi"
      });
    }

    const comment = await prisma.comment.create({
      data: {
        reportId: Number(id),
        authorId: req.user.id,
        content
      }
    });

    res.status(201).json({
      success: true,
      comment
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message
    });

  }
};