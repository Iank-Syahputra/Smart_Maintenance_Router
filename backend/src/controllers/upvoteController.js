import prisma from "../config/database.js";

export async function toggleUpvote(req, res) {
  try {
    const { reportId } = req.params;
    const userId = req.user.id;

    const report = await prisma.report.findUnique({
      where: { id: reportId },
    });
    if (!report) {
      return res.status(404).json({ message: "Laporan tidak ditemukan" });
    }

    const existing = await prisma.upvote.findUnique({
      where: { reportId_userId: { reportId, userId } },
    });

    if (existing) {
      await prisma.upvote.delete({ where: { id: existing.id } });
      const count = await prisma.upvote.count({ where: { reportId } });
      return res.json({ message: "Upvote dibatalkan", upvoted: false, count });
    } else {
      await prisma.upvote.create({ data: { reportId, userId } });
      const count = await prisma.upvote.count({ where: { reportId } });
      return res.status(201).json({ message: "Upvote berhasil", upvoted: true, count });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
