import prisma from "../config/database.js";

export async function getComments(req, res) {
  try {
    const comments = await prisma.comment.findMany({
      where: { reportId: req.params.reportId },
      orderBy: { createdAt: "asc" },
      include: {
        author: {
          select: { id: true, namaLengkap: true, avatarUrl: true, role: true },
        },
      },
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function createComment(req, res) {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ message: "Komentar tidak boleh kosong" });
    }

    const report = await prisma.report.findUnique({
      where: { id: req.params.reportId },
    });
    if (!report) {
      return res.status(404).json({ message: "Laporan tidak ditemukan" });
    }

    const comment = await prisma.comment.create({
      data: {
        reportId: req.params.reportId,
        authorId: req.user.id,
        content,
      },
      include: {
        author: {
          select: { id: true, namaLengkap: true, avatarUrl: true, role: true },
        },
      },
    });

    res.status(201).json({ message: "Komentar berhasil ditambahkan", comment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function deleteComment(req, res) {
  try {
    const comment = await prisma.comment.findUnique({
      where: { id: req.params.commentId },
    });
    if (!comment) {
      return res.status(404).json({ message: "Komentar tidak ditemukan" });
    }
    if (comment.authorId !== req.user.id && req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Tidak memiliki akses" });
    }

    await prisma.comment.delete({ where: { id: req.params.commentId } });
    res.json({ message: "Komentar berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
