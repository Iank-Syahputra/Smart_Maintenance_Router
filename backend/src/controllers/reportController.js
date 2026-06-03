import prisma from "../config/database.js";

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || "http://localhost:8000";

async function predictWithAI(text) {
  try {
    const aiRes = await fetch(`${AI_SERVICE_URL}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
      signal: AbortSignal.timeout(10000),
    });
    if (!aiRes.ok) return null;
    return await aiRes.json();
  } catch {
    return null;
  }
}

export async function createReport(req, res) {
  try {
    const { rawText } = req.body;

    if (!rawText) {
      return res.status(400).json({ message: "Teks laporan wajib diisi" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Foto bukti kerusakan wajib diupload" });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    const report = await prisma.report.create({
      data: {
        authorId: req.user.id,
        rawText,
        imageUrl,
      },
      include: {
        author: {
          select: { id: true, namaLengkap: true, avatarUrl: true },
        },
      },
    });

    const aiResult = await predictWithAI(rawText);

    if (aiResult) {
      const updatedReport = await prisma.report.update({
        where: { id: report.id },
        data: {
          aiKategori: aiResult.kategori,
          aiUrgensi: aiResult.urgensi,
          aiConfidence: aiResult.confidence_kategori,
        },
        include: {
          author: {
            select: { id: true, namaLengkap: true, avatarUrl: true },
          },
        },
      });

      return res.status(201).json({ message: "Laporan berhasil dibuat", report: updatedReport });
    }

    res.status(201).json({ message: "Laporan berhasil dibuat", report });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function getReports(req, res) {
  try {
    const { status, kategori, sort } = req.query;

    const where = {};
    if (status) where.status = status;
    if (kategori) where.aiKategori = kategori;

    const orderBy = [];
    if (sort === "oldest") {
      orderBy.push({ createdAt: "asc" });
    } else if (sort === "trending") {
      orderBy.push({ upvotes: { _count: "desc" } }, { createdAt: "desc" });
    } else {
      orderBy.push({ createdAt: "desc" });
    }

    const reports = await prisma.report.findMany({
      where,
      orderBy,
      include: {
        author: {
          select: { id: true, namaLengkap: true, avatarUrl: true },
        },
        _count: {
          select: { comments: true, upvotes: true },
        },
      },
    });

    const userId = req.user?.id;
    let userUpvotes = [];
    if (userId) {
      userUpvotes = await prisma.upvote.findMany({
        where: { userId, reportId: { in: reports.map((r) => r.id) } },
        select: { reportId: true },
      });
    }
    const upvotedIds = new Set(userUpvotes.map((u) => u.reportId));

    const result = reports.map((r) => ({
      ...r,
      hasUpvoted: upvotedIds.has(r.id),
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function getReportById(req, res) {
  try {
    const report = await prisma.report.findUnique({
      where: { id: req.params.id },
      include: {
        author: {
          select: { id: true, namaLengkap: true, avatarUrl: true, role: true },
        },
        _count: {
          select: { comments: true, upvotes: true },
        },
      },
    });

    if (!report) {
      return res.status(404).json({ message: "Laporan tidak ditemukan" });
    }

    const userId = req.user?.id;
    let hasUpvoted = false;
    if (userId) {
      const upvote = await prisma.upvote.findUnique({
        where: { reportId_userId: { reportId: report.id, userId } },
      });
      hasUpvoted = !!upvote;
    }

    res.json({ ...report, hasUpvoted });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function deleteReport(req, res) {
  try {
    const report = await prisma.report.findUnique({ where: { id: req.params.id } });
    if (!report) {
      return res.status(404).json({ message: "Laporan tidak ditemukan" });
    }
    if (report.authorId !== req.user.id && req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Tidak diizinkan menghapus laporan ini" });
    }
    await prisma.comment.deleteMany({ where: { reportId: req.params.id } });
    await prisma.upvote.deleteMany({ where: { reportId: req.params.id } });
    await prisma.report.delete({ where: { id: req.params.id } });
    res.json({ message: "Laporan berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function updateReportStatus(req, res) {
  try {
    const { status, adminUrgensi } = req.body;
    const data = {};
    if (status) data.status = status;
    if (adminUrgensi) data.adminUrgensi = adminUrgensi;

    const report = await prisma.report.update({
      where: { id: req.params.id },
      data,
      include: {
        author: {
          select: { id: true, namaLengkap: true, avatarUrl: true, role: true },
        },
      },
    });

    if (global.sseClients) {
      const message = JSON.stringify({ type: "status_update", report });
      for (const client of global.sseClients) {
        client.res.write(`data: ${message}\n\n`);
      }
    }

    res.json({ message: "Status laporan diperbarui", report });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
