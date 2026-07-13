import jwt from "jsonwebtoken"
import { prisma } from "@/lib/prisma"

const JWT_SECRET = process.env.JWT_SECRET || "jitter-admin-secret"

export interface JwtPayload {
  id: string
  username: string
  role: string
}

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" })
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload
}

export async function getUserFromToken(token: string) {
  try {
    const payload = verifyToken(token)
    const user = await prisma.adminUser.findUnique({
      where: { id: payload.id },
      select: { id: true, username: true, role: true },
    })
    return user
  } catch {
    return null
  }
}
