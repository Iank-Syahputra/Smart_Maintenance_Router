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
        imageUrl: "no-image",

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

    const reports = await prisma.report.findMany({
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
        },

        orderBy: {
            createdAt: "desc"
        }
        
    });

    res.json({
      success: true,
      total: reports.length,
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