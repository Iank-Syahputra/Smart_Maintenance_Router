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

export const deleteComment = async (
  req,
  res
) => {

  try {

    const { id } = req.params;

    const comment =
      await prisma.comment.findUnique({
        where: {
          id: Number(id)
        }
      });

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Komentar tidak ditemukan"
      });
    }

    const isOwner =
      comment.authorId === req.user.id;

    const isAdmin =
      req.user.role === "ADMIN";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Forbidden"
      });
    }

    await prisma.comment.delete({
      where: {
        id: Number(id)
      }
    });

    res.json({
      success: true,
      message: "Komentar berhasil dihapus"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message
    });

  }

};

export const updateComment =
  async (req, res) => {

    try {

      const { id } = req.params;

      const { content } = req.body;

      const comment =
        await prisma.comment.findUnique({
          where: {
            id: Number(id)
          }
        });

      if (!comment) {
        return res.status(404).json({
          success: false,
          message: "Komentar tidak ditemukan"
        });
      }

      if (
        comment.authorId !==
        req.user.id
      ) {
        return res.status(403).json({
          success: false,
          message: "Akses ditolak"
        });
      }

      const updatedComment =
        await prisma.comment.update({
          where: {
            id: Number(id)
          },
          data: {
            content
          }
        });

      res.json({
        success: true,
        comment: updatedComment
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        error: error.message
      });

    }

};