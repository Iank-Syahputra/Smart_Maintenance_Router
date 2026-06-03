import axios from "axios";
import prisma from "../lib/prisma.js";

export const createReport = async (req, res) => {
  try {

    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        success: false,
        message: "Text laporan wajib diisi"
      });
    }

    const aiResponse = await axios.post(
      "http://127.0.0.1:8000/predict",
      {
        text
      }
    );

    const prediction = aiResponse.data;

    const report = await prisma.report.create({
      data: {
        authorId: req.user.id,
        rawText: text,
        imageUrl:
          req.file
            ? `/uploads/${req.file.filename}`
            : "no-image",

        aiKategori: prediction.kategori,
        aiUrgensi: prediction.urgensi,

        confidenceKategori:
          prediction.confidence_kategori,

        confidenceUrgensi:
          prediction.confidence_urgensi
      }
    });

    res.status(201).json({
      success: true,
      report
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message
    });

  }
};

export const getAllReports = async (req, res) => {
  try {

    const {
      status,
      sort,
      page = 1,
      limit = 10
    } = req.query;

    const where = {};

    if (status) {
      where.status = status;
    }

    const reports = await prisma.report.findMany({
      where,

      skip:
        (Number(page) - 1) *
        Number(limit),

      take:
        Number(limit),

      include: {
        author: {
          select: {
            id: true,
            namaLengkap: true,
            avatarUrl: true
          }
        },

        upvotes: {
          select: {
            id: true
          }
        },

        _count: {
          select: {
            comments: true,
            upvotes: true
          }
        }
      }
    });

    const totalReports =
      await prisma.report.count({
        where
      });

    // SORT BY UPVOTES
    if (sort === "upvotes") {

      reports.sort(
        (a, b) =>
          b._count.upvotes -
          a._count.upvotes
      );

    }

    // SORT BY URGENCY (DEFAULT)
    else {

      const urgencyValue = {
        TINGGI: 3,
        SEDANG: 2,
        RENDAH: 1,

        Tinggi: 3,
        Sedang: 2,
        Rendah: 1
      };

      reports.sort((a, b) => {

        const urgencyA =
          a.adminUrgensi ||
          a.aiUrgensi;

        const urgencyB =
          b.adminUrgensi ||
          b.aiUrgensi;

        return (
          urgencyValue[urgencyB] -
          urgencyValue[urgencyA]
        );

      });

    }

    res.json({
      success: true,

      page: Number(page),

      limit: Number(limit),

      totalReports,

      totalPages:
        Math.ceil(
          totalReports /
          Number(limit)
        ),

      reports
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message
    });

  }
};

export const getReportById = async (req, res) => {
  try {

    const { id } = req.params;

    const report = await prisma.report.findUnique({
      where: {
        id: Number(id)
      },
        include: {
            author: {
                select: {
                id: true,
                namaLengkap: true,
                avatarUrl: true
                }
            },

            _count: {
                select: {
                comments: true,
                upvotes: true
                }
            },

            comments: {
                include: {
                author: {
                    select: {
                    id: true,
                    namaLengkap: true,
                    avatarUrl: true
                    }
                }
                },
                orderBy: {
                createdAt: "desc"
                }
            }
        }
    });

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report tidak ditemukan"
      });
    }

    res.json({
      success: true,
      report
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message
    });

  }
};

export const updateReportStatus = async (
  req,
  res
) => {

  try {

    const { id } = req.params;

    const { status } = req.body;

    const report =
      await prisma.report.update({
        where: {
          id: Number(id)
        },
        data: {
          status
        }
      });

    res.json({
      success: true,
      report
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message
    });

  }

};

export const updateReportUrgency =
  async (req, res) => {

    try {

      const { id } = req.params;

      const { adminUrgensi } =
        req.body;

      const report =
        await prisma.report.update({
          where: {
            id: Number(id)
          },
          data: {
            adminUrgensi
          }
        });

      res.json({
        success: true,
        report
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false,
        error: error.message
      });

    }

};

export const searchReports = async (
  req,
  res
) => {

  try {

    const { q } = req.query;

    const reports =
      await prisma.report.findMany({
        where: {
          rawText: {
            contains: q
          }
        },

        include: {
          author: {
            select: {
              id: true,
              namaLengkap: true,
              avatarUrl: true
            }
          },

          _count: {
            select: {
              comments: true,
              upvotes: true
            }
          }
        }
      });

    res.json({
      success: true,
      total: reports.length,
      reports
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message
    });

  }

};

export const getTrendingReports =
  async (req, res) => {

    try {

      const mostUpvoted =
        await prisma.report.findMany({
          take: 5,

          include: {
            _count: {
              select: {
                upvotes: true
              }
            }
          }
        });

      mostUpvoted.sort(
        (a, b) =>
          b._count.upvotes -
          a._count.upvotes
      );

      const highestUrgency =
        await prisma.report.findMany({
          where: {
            OR: [
              {
                adminUrgensi:
                  "TINGGI"
              },
              {
                aiUrgensi:
                  "Tinggi"
              }
            ]
          },
          take: 5
        });

      const recentlyResolved =
        await prisma.report.findMany({
          where: {
            status: "SELESAI"
          },

          orderBy: {
            createdAt: "desc"
          },

          take: 5
        });

      res.json({
        success: true,

        mostUpvoted,

        highestUrgency,

        recentlyResolved
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        error: error.message
      });

    }

  };