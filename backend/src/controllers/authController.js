import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../config/database.js";

export async function register(req, res) {
  try {
    const { namaLengkap, email, password } = req.body;

    const existing = await prisma.profile.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const profile = await prisma.profile.create({
      data: { namaLengkap, email, password: hashedPassword },
    });

    const token = jwt.sign(
      { id: profile.id, email: profile.email, role: profile.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "Registrasi berhasil",
      token,
      user: {
        id: profile.id,
        namaLengkap: profile.namaLengkap,
        email: profile.email,
        role: profile.role,
        avatarUrl: profile.avatarUrl,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const profile = await prisma.profile.findUnique({ where: { email } });
    if (!profile) {
      return res.status(401).json({ message: "Email atau password salah" });
    }

    const valid = await bcrypt.compare(password, profile.password);
    if (!valid) {
      return res.status(401).json({ message: "Email atau password salah" });
    }

    const token = jwt.sign(
      { id: profile.id, email: profile.email, role: profile.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login berhasil",
      token,
      user: {
        id: profile.id,
        namaLengkap: profile.namaLengkap,
        email: profile.email,
        role: profile.role,
        avatarUrl: profile.avatarUrl,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function me(req, res) {
  try {
    const profile = await prisma.profile.findUnique({
      where: { id: req.user.id },
      select: { id: true, namaLengkap: true, email: true, role: true, avatarUrl: true, createdAt: true },
    });
    if (!profile) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function updateProfile(req, res) {
  try {
    const { namaLengkap } = req.body;
    if (!namaLengkap) {
      return res.status(400).json({ message: "Nama lengkap wajib diisi" });
    }

    const profile = await prisma.profile.update({
      where: { id: req.user.id },
      data: { namaLengkap },
      select: { id: true, namaLengkap: true, email: true, role: true, avatarUrl: true, createdAt: true },
    });

    res.json({ message: "Profil berhasil diperbarui", user: profile });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function uploadAvatar(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File avatar wajib diupload" });
    }

    const avatarUrl = `/uploads/avatars/${req.file.filename}`;

    const profile = await prisma.profile.update({
      where: { id: req.user.id },
      data: { avatarUrl },
      select: { id: true, namaLengkap: true, email: true, role: true, avatarUrl: true, createdAt: true },
    });

    res.json({ message: "Avatar berhasil diperbarui", user: profile });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
