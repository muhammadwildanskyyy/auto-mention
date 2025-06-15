// Lokasi: src/lib/prisma.ts

import { PrismaClient } from "@prisma/client";

// Deklarasikan globalThis untuk menyimpan instance prisma
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Buat instance prisma jika belum ada
export const client =
  globalForPrisma.prisma ??
  new PrismaClient({
    // Opsional: tambahkan log jika Anda butuh debugging
    // log: ['query'],
  });

// Di lingkungan non-produksi, simpan instance ke globalThis
// untuk mencegah pembuatan koneksi baru setiap kali ada hot-reload.
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = client;
}
