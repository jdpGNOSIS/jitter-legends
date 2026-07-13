import { PrismaClient } from "@prisma/client"
import { PrismaLibSql } from "@prisma/adapter-libsql"
import path from "path"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function getClient() {
  const rawUrl = process.env.DATABASE_URL || "file:./dev.db"
  const filePath = rawUrl.startsWith("file:") ? rawUrl.slice(5) : rawUrl
  const absolutePath = path.resolve(process.cwd(), filePath).replace(/\\/g, "/")
  const url = "file:///" + absolutePath
  const adapter = new PrismaLibSql({ url })
  return new PrismaClient({ adapter })
}

export const prisma = globalForPrisma.prisma ?? getClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
