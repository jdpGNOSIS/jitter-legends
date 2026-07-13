$outputPath = "C:\Users\DEZRA\jitter-legends\prisma\seed.ts"

$content = @'
import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'
import * as crypto from 'crypto'
import * as bcrypt from 'bcryptjs'
import * as path from 'path'

function createPrisma() {
  const rawUrl = process.env.DATABASE_URL || 'file:./dev.db'
  const filePath = rawUrl.startsWith('file:') ? rawUrl.slice(5) : rawUrl
  const projectRoot = path.resolve(__dirname, '..')
  const absolutePath = path.resolve(projectRoot, filePath).replace(/\\/g, '/')
  const url = 'file:///' + absolutePath
  const adapter = new PrismaLibSql({ url })
  return new PrismaClient({ adapter })
}

const prisma = createPrisma()

function rId(): string {
  return crypto.randomUUID()
}

async function main() {
  const naviId = rId()
  const fazeId = rId()
  const g2Id = rId()
  const vitalityId = rId()
  const spiritId = rId()
  const mouzId = rId()
  const cloud9Id = rId()
  const liquidId = rId()
  const astralisId = rId()
  const vpId = rId()
  const heroicId = rId()
  const furiaId = rId()
  const efId = rId()
  const nineZId = rId()
  const bigId = rId()

  const b1tId = rId(); const jLId = rId(); const imId = rId(); const aleksibId = rId(); const w0nderfulId = rId()
  const frozenId = rId(); const brokyId = rId(); const rainId = rId(); const karriganId = rId(); const ropzId = rId()
  const nikoId = rId(); const monesyId = rId(); const hunterId = rId(); const snaxId = rId(); const malbsmdId = rId()
  const zywooId = rId(); const apexId = rId(); const spinxId = rId(); const flamezId = rId(); const meziiId = rId()
  const donkId = rId(); const sh1roId = rId(); const magixxId = rId(); const zont1xId = rId(); const chopperId = rId()
  const torzsiId = rId(); const jimpphatId = rId(); const siuhyId = rId(); const brollanId = rId(); const xertionId = rId()
  const ax1leId = rId(); const boombl4Id = rId(); const perfectoId = rId(); const heavygodId = rId(); const interzId = rId()
  const twistzzId = rId(); const nafId = rId(); const skullzId = rId(); const jksId = rId(); const cadiaNId = rId()
  const stavnId = rId(); const jabbiId = rId(); const staehrId = rId(); const br0Id = rId(); const deviceId = rId()
  const jameId = rId(); const fl1tId = rId(); const fameId = rId(); const n0rb3r7Id = rId(); const electronicId = rId()
  const tesesId = rId(); const sjuushId = rId(); const kyxsanId = rId(); const nicoodozId = rId(); const s1nId = rId()
  const fallenId = rId(); const ksceratoId = rId(); const yuurihId = rId(); const cheloId = rId(); const artId = rId()
  const xantaresId = rId(); const woxicId = rId(); const maj3rId = rId(); const calyxId = rId(); const wicadiaId = rId()
  const dav1deusId = rId(); const maxujasId = rId(); const martinezId = rId(); const dgtId = rId(); const budaId = rId()
  const tabsenId = rId(); const syrsonId = rId(); const jdcId = rId(); const krimboId = rId(); const rigonId = rId()
  const jitterId = rId()

  const iemKatowice2025Id = rId(); const pglMajorCopenhagen2024Id = rId(); const blastWorldFinal2024Id = rId()
  const eslProLeagueS21Id = rId(); const iemCologne2024Id = rId(); const blastSpringFinal2025Id = rId()
  const iemDallas2024Id = rId(); const eslProLeagueS20Id = rId(); const blastFallFinal2024Id = rId()
  const iemChengdu2024Id = rId(); const pglMajorAntwerp2024Id = rId(); const blastSpringGroups2025Id = rId()
  const iemRio2024Id = rId(); const eslProLeagueS19Id = rId(); const skyesports2024Id = rId()
'@

$content | Set-Content $outputPath -Encoding UTF8

Write-Host "Part 1 written"