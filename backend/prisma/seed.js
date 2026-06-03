import bcrypt from "bcryptjs";
import prisma from "../src/config/database.js";

async function main() {
  const adminPassword = await bcrypt.hash("admin123", 10);

  const admin = await prisma.profile.upsert({
    where: { email: "admin@fmipa.uho.ac.id" },
    update: {},
    create: {
      namaLengkap: "Admin FMIPA",
      email: "admin@fmipa.uho.ac.id",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  console.log("Admin seeded:", admin.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
