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
const rId = () => crypto.randomUUID()

function p(slug: string, name: string, ign: string, age: number, country: string, bio: string, earnings: number, mvps: number, wins: number, hs: number, kd: number, rating: number, maps: number, clutches: number, weapon: string, pistol: number, kills: number) {
  return { id: rId(), slug, name, ign, age, country, biography: bio, careerEarnings: earnings, mvpCount: mvps, tournamentWins: wins, headshotPercentage: hs, kdRatio: kd, rating, mapsPlayed: maps, clutchesWon: clutches, signatureWeapon: weapon, pistolRoundWinRate: pistol, totalKills: kills }
}

const players = [
  p('jitter','Jacob Daniel Powell','Jitter',22,'United States','Mechanical prodigy. Elite aim, game sense, and clutch ability. Rising superstar.',1287000,8,12,68.5,1.35,1.28,843,97,'AK-47',82.3,18472),
  p('b1t','Valerii Vakhovskyi','b1t',21,'Ukraine','Ukrainian rifler known for incredible consistency.',980000,5,9,64.2,1.22,1.18,1245,78,'AK-47',58.4,15678),
  p('jl','Justinas Lekavicius','jL',24,'Lithuania','Lithuanian star with explosive playstyle.',560000,3,5,58.7,1.18,1.14,890,52,'AK-47',56.2,11230),
  p('im','Ivan Mihai','iM',24,'Romania','Romanian rifler with powerful aim.',450000,2,4,55.3,1.09,1.07,780,34,'M4A4',52.8,9456),
  p('aleksib','Aleksi Virolainen','Aleksib',27,'Finland','Finnish IGL with tactical genius.',780000,2,7,48.1,0.96,0.99,1678,45,'M4A1-S',49.5,18234),
  p('w0nderful','Ihor Zhdanov','w0nderful',20,'Ukraine','Ukrainian AWPer with incredible potential.',340000,1,3,42.5,1.12,1.09,567,28,'AWP',51.3,7234),
  p('frozen','David Cernansky','frozen',22,'Slovakia','Slovakian rifler, one of the most consistent players.',820000,4,8,60.8,1.19,1.16,1456,62,'AK-47',57.1,16789),
  p('broky','Helvijs Saukants','broky',23,'Latvia','Latvian AWPer, clutch master.',890000,4,9,44.1,1.15,1.12,1345,82,'AWP',53.6,14567),
  p('rain','Havard Nygaard','rain',30,'Norway','Norwegian veteran, FaZe core member.',1020000,5,12,56.7,1.08,1.06,2012,56,'AK-47',54.2,22456),
  p('karrigan','Finn Andersen','karrigan',34,'Denmark','Danish IGL, legendary leader.',1150000,3,14,44.3,0.92,0.96,2345,38,'M4A1-S',48.7,24567),
  p('ropz','Robin Kool','ropz',24,'Estonia','Estonian superstar, one of the smartest players.',940000,6,10,59.2,1.21,1.17,1567,71,'AK-47',59.8,17890),
  p('niko','Nikola Kovac','NiKo',27,'Bosnia and Herzegovina','Bosnian superstar, arguably the best rifler ever.',1350000,8,11,62.5,1.24,1.19,1890,84,'AK-47',61.3,21345),
  p('m0nesy','Ilya Osipov','m0NESY',19,'Russia','Russian prodigy, best young AWPer in the world.',720000,5,6,46.8,1.27,1.22,890,65,'AWP',56.4,11234),
  p('hunter-','Nemanja Kovac','huNter-',28,'Bosnia and Herzegovina','Bosnian rifler, NiKo\'s cousin and longtime teammate.',910000,3,9,55.8,1.12,1.09,1723,48,'AK-47',55.1,19456),
  p('snax','Janusz Pogorzelski','Snax',31,'Poland','Polish veteran IGL with championship experience.',780000,3,8,49.2,0.98,1.01,1978,42,'M4A1-S',50.2,21567),
  p('malbsmd','Mario Samayoa','malbsMd',22,'Guatemala','Guatemalan star, rising talent in the international scene.',280000,1,2,57.3,1.14,1.11,456,22,'AK-47',54.8,5678),
  p('zywoo','Mathieu Herbaut','ZywOo',23,'France','French phenom, consistently ranked best player in the world.',1450000,12,14,58.3,1.32,1.25,1678,92,'AWP',62.1,20134),
  p('apex','Dan Madesclaire','apEX',31,'France','French IGL, veteran leader with explosive energy.',1050000,2,12,45.6,0.94,0.98,2234,35,'M4A1-S',49.1,23456),
  p('spinx','Lotan Giladi','Spinx',24,'Israel','Israeli rifler known for incredible entry fragging.',640000,3,7,56.4,1.16,1.13,1123,45,'AK-47',55.7,13456),
  p('flamez','Shahar Shushan','flameZ',21,'Israel','Israeli prodigy with superstar potential.',420000,2,4,59.1,1.13,1.10,678,31,'AK-47',53.4,8345),
  p('mezii','William Merriman','mezii',25,'United Kingdom','British player known for versatility and team play.',380000,1,4,52.3,1.05,1.04,745,28,'M4A4',51.6,9123),
  p('donk','Danil Kryshkovets','donk',18,'Russia','Russian prodigy, youngest superstar in CS history with insane mechanics.',520000,4,5,66.8,1.31,1.26,456,38,'AK-47',64.2,7234),
  p('sh1ro','Dmitry Sokolov','sh1ro',23,'Russia','Russian AWPer, one of the most consistent players in the world.',780000,5,8,43.2,1.23,1.18,1345,76,'AWP',54.5,14567),
  p('magixx','Boris Vorobiev','magixx',21,'Russia','Russian rifler known for consistency and team play.',420000,1,5,54.7,1.08,1.06,934,34,'AK-47',52.3,11234),
  p('zont1x','Artem Kharitonov','zont1x',20,'Russia','Russian rifler, rising star in the Spirit lineup.',280000,1,3,56.1,1.10,1.08,534,22,'AK-47',51.8,6678),
  p('chopper','Leonid Vishnyakov','chopper',27,'Russia','Russian IGL, captain of Team Spirit.',560000,1,6,41.2,0.92,0.96,1567,29,'M4A1-S',47.9,16789),
  p('torzsi','Adam Torzsas','torzsi',23,'Hungary','Hungarian AWPer with incredible potential.',340000,1,4,41.8,1.10,1.07,678,34,'AWP',50.6,7789),
  p('jimpphat','Jimmy Salo','Jimpphat',19,'Finland','Finnish prodigy, one of the youngest players in top tier.',240000,1,3,58.3,1.13,1.10,423,18,'AK-47',52.9,5345),
  p('siuhy','Kamil Szkaradek','siuhy',22,'Poland','Polish IGL, young tactical mind.',320000,1,4,47.5,1.02,1.02,589,24,'M4A4',50.1,6890),
  p('brollan','Ludvig Brollan','Brollan',25,'Sweden','Swedish rifler with explosive entry style.',520000,2,5,55.2,1.08,1.06,1123,36,'AK-47',53.4,13456),
  p('xertion','Julian Kalenic','xertioN',20,'Israel','Israeli rifler, aggressive playmaker.',260000,1,3,57.6,1.12,1.09,478,22,'AK-47',52.7,6123),
  p('ax1le','Sergey Rykhtorov','Ax1Le',22,'Russia','Russian star rifler, known for incredible aim duels.',620000,3,5,60.4,1.18,1.15,1123,48,'AK-47',56.8,13456),
  p('boombl4','Kirill Mikhailov','Boombl4',25,'Russia','Russian IGL, former Major winner.',780000,1,6,43.1,0.95,0.99,1456,28,'M4A1-S',48.3,15678),
  p('perfecto','Ilya Zalutskiy','Perfecto',24,'Russia','Russian support player, anchor extraordinaire.',720000,1,6,49.8,1.06,1.04,1345,38,'M4A1-S',51.2,14567),
  p('heavygod','Timofey Yakushin','HeavyGod',23,'Ukraine','Ukrainian rifler with powerful mechanics.',180000,0,1,54.6,1.07,1.05,312,14,'AK-47',51.5,3789),
  p('interz','Timofey Yakushin','interz',24,'Russia','Russian rifler, support specialist.',420000,0,3,46.7,0.98,0.99,934,22,'M4A4',48.9,10234),
  p('twistzz','Russel Van Dulken','Twistzz',24,'Canada','Canadian superstar, one of the best riflers in NA history.',980000,6,10,61.3,1.19,1.16,1678,62,'AK-47',58.6,19023),
  p('naf','Keith Markovic','NAF',26,'Canada','Canadian rifler, consistent star performer.',890000,4,9,55.4,1.14,1.11,1567,52,'AK-47',55.2,17890),
  p('skullz','Felipe Medeiros','skullz',22,'Brazil','Brazilian rifler, aggressive entry fragger.',240000,0,2,53.8,1.05,1.04,456,16,'AK-47',51.4,5567),
  p('jks','Justin Savage','jks',28,'Australia','Australian rifler, veteran anchor player.',680000,2,6,51.2,1.04,1.03,1567,38,'M4A1-S',50.8,16789),
  p('cadnan','Casper Moller','cadiaN',30,'Denmark','Danish IGL, charismatic leader with innovative strategies.',720000,2,6,42.3,0.93,0.97,1890,32,'AWP',48.1,19234),
  p('stavn','Martin Lund','stavn',22,'Denmark','Danish star rifler, one of the best in Denmark.',640000,3,5,57.8,1.15,1.12,1234,46,'AK-47',55.6,14567),
  p('jabbi','Jakob Nygaard','jabbi',21,'Denmark','Danish rifler, explosive entry player.',420000,2,4,56.2,1.11,1.08,834,32,'AK-47',53.2,10123),
  p('staehr','Victor Staehr','Staehr',20,'Denmark','Danish prodigy, young talent in Astralis.',220000,0,2,54.1,1.06,1.05,378,14,'AK-47',50.7,4456),
  p('br0','Alexander Bro','br0',23,'Denmark','Danish rifler, versatile player.',180000,0,1,51.5,1.03,1.02,312,12,'M4A4',49.8,3567),
  p('dev1ce','Nicolai Reedtz','dev1ce',29,'Denmark','Danish AWPer, one of the greatest of all time.',1520000,10,15,45.6,1.22,1.18,2123,88,'AWP',57.3,24123),
  p('jame','Dzhami Ali','Jame',26,'Russia','Russian AWPer/IGL, known for methodical play.',640000,2,6,40.2,1.16,1.12,1567,68,'AWP',52.4,15678),
  p('fl1t','Evgeny Lebedev','FL1T',24,'Russia','Russian rifler, consistent firepower.',480000,1,5,55.8,1.10,1.08,1123,34,'AK-47',53.1,12345),
  p('fame','Evgeny Vasilev','fame',22,'Russia','Russian rifler, rising star.',280000,0,3,54.2,1.06,1.05,678,18,'AK-47',51.3,7567),
  p('n0rb3r7','Boris Zhdanov','n0rb3r7',23,'Russia','Russian rifler, team player.',340000,0,4,49.6,1.01,1.01,834,24,'M4A1-S',49.5,9345),
  p('electronic','Denis Sharipov','electroNic',26,'Russia','Russian IGL/rifler, former Major winner.',1020000,4,8,53.4,1.09,1.07,1890,46,'AK-47',53.8,20134),
  p('teses','Rene Madsen','TeSeS',26,'Denmark','Danish rifler, entry fragger.',420000,1,4,54.5,1.07,1.05,1123,32,'AK-47',52.6,12345),
  p('sjuush','Rasmus Beck','sjuush',25,'Denmark','Danish rifler, anchor specialist.',480000,1,5,48.9,1.03,1.02,1234,28,'M4A1-S',50.2,13456),
  p('kyxsan','Damjan Stoilkovski','kyxsan',23,'North Macedonia','Macedonian IGL, young tactical leader.',220000,0,2,46.3,0.98,0.99,534,16,'M4A4',48.7,6123),
  p('nicoodoz','Nicolai Hvidt','nicoodoz',23,'Denmark','Danish AWPer.',280000,0,2,40.8,1.05,1.03,678,24,'AWP',49.3,7345),
  p('fallen','Gabriel Toledo','FalleN',33,'Brazil','Brazilian AWPer/IGL, legendary figure in CS history.',1250000,7,12,42.1,1.08,1.06,2345,72,'AWP',54.3,24567),
  p('kscerato','Kaue Cerato','KSCERATO',25,'Brazil','Brazilian star rifler, best in the region.',560000,3,5,58.7,1.16,1.13,1345,48,'AK-47',55.9,15678),
  p('yuurih','Yuri Santos','yuurih',24,'Brazil','Brazilian rifler, consistent performer.',420000,1,4,54.3,1.08,1.06,1123,32,'AK-47',52.4,12345),
  p('chelo','Marcelo Cespedes','chelo',25,'Brazil','Brazilian rifler, entry player.',280000,0,3,52.8,1.03,1.02,834,22,'AK-47',50.6,9345),
  p('art','Artur Siervo','arT',28,'Brazil','Brazilian IGL, known for aggressive, unpredictable style.',480000,2,5,44.7,0.96,1.00,1456,34,'M4A1-S',49.8,14567),
  p('xantares','Ismailcan Dortkardes','XANTARES',29,'Turkey','Turkish superstar, incredible aim.',678000,4,6,62.1,1.16,1.12,1567,68,'AK-47',60.4,20134),
  p('woxic','Ozgur Eker','woxic',26,'Turkey','Turkish AWPer, fast reflexes.',456000,2,4,49.8,1.12,1.08,1123,52,'AWP',55.6,12345),
  p('maj3r','Engin Kupeli','MAJ3R',33,'Turkey','Turkish IGL, veteran leader.',345000,1,4,46.3,0.94,0.97,1345,32,'M4A1-S',50.8,11234),
  p('calyx','Berkant Caliskan','Calyx',27,'Turkey','Turkish rifler, experienced star.',340000,1,3,52.1,1.04,1.03,1123,28,'AK-47',51.2,12134),
  p('wicadia','Alihan Durali','Wicadia',21,'Turkey','Turkish prodigy, rising star.',120000,0,1,56.4,1.08,1.06,256,12,'AK-47',52.1,3123),
  p('dav1deus','David Tapia','dav1deuS',22,'Chile','Chilean AWPer, star player.',180000,0,1,42.3,1.07,1.05,378,18,'AWP',49.6,4456),
  p('maxujas','Maximiliano Gonzalez','maxujas',24,'Argentina','Argentinian rifler.',140000,0,1,52.3,1.03,1.02,312,12,'AK-47',50.1,3567),
  p('martinez','Lucas Martinez','Martinez',23,'Argentina','Argentinian rifler.',120000,0,1,50.8,1.01,1.01,256,10,'M4A4',49.2,2890),
  p('dgt','Franco Garcia','dgt',22,'Argentina','Argentinian IGL.',100000,0,1,44.5,0.96,0.98,234,8,'M4A1-S',47.5,2567),
  p('buda','Mikael Lopes','buda',20,'Brazil','Brazilian rifler, young talent.',80000,0,0,53.2,1.04,1.03,156,6,'AK-47',50.3,1876),
  p('tabsen','Johannes Tabs','tabseN',29,'Germany','German IGL, BIG captain.',520000,2,5,48.7,1.01,1.01,1678,38,'AK-47',51.3,17890),
  p('syrson','Roland Syson','syrsoN',27,'Germany','German AWPer.',420000,1,4,41.2,1.08,1.05,1234,48,'AWP',51.8,12345),
  p('jdc','Josef Dubois','JDC',22,'Germany','German rifler.',180000,0,2,53.6,1.05,1.04,456,16,'AK-47',50.6,5234),
  p('krimbo','Karim Moussa','Krimbo',21,'Germany','German rifler, young talent.',140000,0,1,52.8,1.04,1.03,334,12,'AK-47',49.9,3789),
  p('rigon','Michele Rigon','rigoN',24,'Switzerland','Swiss rifler.',160000,0,1,51.4,1.02,1.02,412,14,'M4A4',49.4,4567),
]

const playerMap: Record<string, any> = {}
for (const p of players) playerMap[p.slug] = p

const teams = [
  { id: rId(), slug: 'natus-vincere', name: 'Natus Vincere', acronym: 'NAVI', description: 'Ukrainian esports organization. One of the most successful teams in Counter-Strike history.', primaryColor: '#fcdb05', secondaryColor: '#2b2b5c' },
  { id: rId(), slug: 'faze-clan', name: 'FaZe Clan', acronym: 'FaZe', description: 'International powerhouse known for aggressive playstyle and star-studded lineups.', primaryColor: '#e01a22', secondaryColor: '#000000' },
  { id: rId(), slug: 'g2-esports', name: 'G2 Esports', acronym: 'G2', description: 'European superteam with a legacy of world-class talent and championship pedigree.', primaryColor: '#0a0a0a', secondaryColor: '#fafafa' },
  { id: rId(), slug: 'team-vitality', name: 'Team Vitality', acronym: 'Vitality', description: 'French organization with a world-class roster led by the best player in the world.', primaryColor: '#fdb827', secondaryColor: '#000000' },
  { id: rId(), slug: 'team-spirit', name: 'Team Spirit', acronym: 'Spirit', description: 'Russian organization that developed the youngest superstar in CS history.', primaryColor: '#1ba64d', secondaryColor: '#ffffff' },
  { id: rId(), slug: 'mouz', name: 'MOUZ', acronym: 'MOUZ', description: 'German organization with a reputation for developing young talent and tactical gameplay.', primaryColor: '#ffffff', secondaryColor: '#000000' },
  { id: rId(), slug: 'cloud9', name: 'Cloud9', acronym: 'C9', description: 'American organization with a rich history in competitive CS.', primaryColor: '#0055a4', secondaryColor: '#ed1c24' },
  { id: rId(), slug: 'team-liquid', name: 'Team Liquid', acronym: 'Liquid', description: 'North American champions with a global roster.', primaryColor: '#00aef0', secondaryColor: '#272822' },
  { id: rId(), slug: 'astralis', name: 'Astralis', acronym: 'Astralis', description: 'Danish dynasty that defined an era of Counter-Strike with tactical perfection.', primaryColor: '#c8102e', secondaryColor: '#000000' },
  { id: rId(), slug: 'virtus-pro', name: 'Virtus.pro', acronym: 'VP', description: 'Russian veterans known for their resilience and clutch ability.', primaryColor: '#d42027', secondaryColor: '#000000' },
  { id: rId(), slug: 'heroic', name: 'Heroic', acronym: 'Heroic', description: 'Danish contenders with a structured system and consistent tournament performances.', primaryColor: '#004c97', secondaryColor: '#ffffff' },
  { id: rId(), slug: 'furia', name: 'FURIA Esports', acronym: 'FURIA', description: 'Brazilian squad known for their aggressive style and passionate fanbase.', primaryColor: '#fdb827', secondaryColor: '#000000' },
  { id: rId(), slug: 'eternal-fire', name: 'Eternal Fire', acronym: 'EF', description: 'Turkish team with firepower and a never-say-die attitude.', primaryColor: '#e01a22', secondaryColor: '#000000' },
  { id: rId(), slug: '9z', name: '9z Team', acronym: '9z', description: 'Latin American representatives making waves on the global stage.', primaryColor: '#0a0a0a', secondaryColor: '#fafafa' },
  { id: rId(), slug: 'big', name: 'BIG', acronym: 'BIG', description: 'German organization known for disciplined CS and strong academy system.', primaryColor: '#d4af37', secondaryColor: '#0a0a0a' },
]

const teamMap: Record<string, any> = {}
for (const t of teams) teamMap[t.slug] = t

const teamPlayerSlugs: Record<string, string[]> = {
  'natus-vincere': ['b1t','jl','im','aleksib','w0nderful'],
  'faze-clan': ['frozen','broky','rain','karrigan','ropz'],
  'g2-esports': ['niko','m0nesy','hunter-','snax','malbsmd','jitter'],
  'team-vitality': ['zywoo','apex','spinx','flamez','mezii'],
  'team-spirit': ['donk','sh1ro','magixx','zont1x','chopper'],
  'mouz': ['torzsi','jimpphat','siuhy','brollan','xertion'],
  'cloud9': ['ax1le','boombl4','perfecto','heavygod','interz'],
  'team-liquid': ['twistzz','naf','skullz','jks','cadnan'],
  'astralis': ['stavn','jabbi','staehr','br0','dev1ce'],
  'virtus-pro': ['jame','fl1t','fame','n0rb3r7','electronic'],
  'heroic': ['teses','sjuush','kyxsan','nicoodoz','fallen'],
  'furia': ['kscerato','yuurih','chelo','art','fallen'],
  'eternal-fire': ['xantares','woxic','maj3r','calyx','wicadia'],
  '9z': ['dav1deus','maxujas','martinez','dgt','buda'],
  'big': ['tabsen','syrson','jdc','krimbo','rigon'],
}

const tournaments = [
  { id: rId(), slug: 'iem-katowice-2025', name: 'IEM Katowice 2025', description: 'The iconic Polish tournament with the legendary Spodek Arena crowd.', location: 'Katowice, Poland', startDate: new Date('2025-01-29'), endDate: new Date('2025-02-09'), prizePool: 1000000, tier: 'S', status: 'completed', winnerId: '' as string, mvpId: '' as string },
  { id: rId(), slug: 'pgl-major-copenhagen-2024', name: 'PGL Major Copenhagen 2024', description: 'The first Major in Denmark. A historic event in the CS2 era.', location: 'Copenhagen, Denmark', startDate: new Date('2024-03-17'), endDate: new Date('2024-03-31'), prizePool: 1250000, tier: 'S', status: 'completed', winnerId: '', mvpId: '' },
  { id: rId(), slug: 'blast-premier-world-final-2024', name: 'BLAST Premier World Final 2024', description: 'The culmination of the BLAST Premier circuit.', location: 'Singapore', startDate: new Date('2024-10-30'), endDate: new Date('2024-11-04'), prizePool: 1000000, tier: 'S', status: 'completed', winnerId: '', mvpId: '' },
  { id: rId(), slug: 'esl-pro-league-s21', name: 'ESL Pro League Season 21', description: 'The longest-running league in CS returns.', location: "St. Julian's, Malta", startDate: new Date('2025-03-01'), endDate: new Date('2025-03-16'), prizePool: 750000, tier: 'S', status: 'completed', winnerId: '', mvpId: '' },
  { id: rId(), slug: 'iem-cologne-2024', name: 'IEM Cologne 2024', description: 'The Cathedral of Counter-Strike.', location: 'Cologne, Germany', startDate: new Date('2024-08-07'), endDate: new Date('2024-08-18'), prizePool: 1000000, tier: 'S', status: 'completed', winnerId: '', mvpId: '' },
  { id: rId(), slug: 'blast-spring-final-2025', name: 'BLAST Premier Spring Final 2025', description: 'Spring showdown in London.', location: 'London, United Kingdom', startDate: new Date('2025-06-18'), endDate: new Date('2025-06-22'), prizePool: 425000, tier: 'A', status: 'completed', winnerId: '', mvpId: '' },
  { id: rId(), slug: 'iem-dallas-2024', name: 'IEM Dallas 2024', description: 'American crowd brings the energy.', location: 'Dallas, USA', startDate: new Date('2024-05-27'), endDate: new Date('2024-06-02'), prizePool: 250000, tier: 'A', status: 'completed', winnerId: '', mvpId: '' },
  { id: rId(), slug: 'esl-pro-league-s20', name: 'ESL Pro League Season 20', description: 'Another season of top-tier league play.', location: "St. Julian's, Malta", startDate: new Date('2024-09-03'), endDate: new Date('2024-09-22'), prizePool: 750000, tier: 'S', status: 'completed', winnerId: '', mvpId: '' },
  { id: rId(), slug: 'blast-fall-final-2024', name: 'BLAST Premier Fall Final 2024', description: 'Fall season finals in Denmark.', location: 'Copenhagen, Denmark', startDate: new Date('2024-09-25'), endDate: new Date('2024-09-29'), prizePool: 425000, tier: 'A', status: 'completed', winnerId: '', mvpId: '' },
  { id: rId(), slug: 'iem-chengdu-2024', name: 'IEM Chengdu 2024', description: 'Chinese debut for IEM.', location: 'Chengdu, China', startDate: new Date('2024-04-08'), endDate: new Date('2024-04-14'), prizePool: 250000, tier: 'A', status: 'completed', winnerId: '', mvpId: '' },
  { id: rId(), slug: 'pgl-major-antwerp-2024', name: 'PGL Major Antwerp 2024', description: 'Major championship in Belgium.', location: 'Antwerp, Belgium', startDate: new Date('2024-05-08'), endDate: new Date('2024-05-21'), prizePool: 1250000, tier: 'S', status: 'completed', winnerId: '', mvpId: '' },
  { id: rId(), slug: 'blast-spring-groups-2025', name: 'BLAST Premier Spring Groups 2025', description: 'Opening event of the BLAST season.', location: 'Copenhagen, Denmark', startDate: new Date('2025-01-14'), endDate: new Date('2025-01-26'), prizePool: 190000, tier: 'B', status: 'completed', winnerId: '', mvpId: '' },
  { id: rId(), slug: 'iem-rio-2024', name: 'IEM Rio 2024', description: 'Brazilian crowd brings unmatched passion.', location: 'Rio de Janeiro, Brazil', startDate: new Date('2024-10-07'), endDate: new Date('2024-10-13'), prizePool: 250000, tier: 'A', status: 'completed', winnerId: '', mvpId: '' },
  { id: rId(), slug: 'esl-pro-league-s19', name: 'ESL Pro League Season 19', description: 'Opening season of the year.', location: "St. Julian's, Malta", startDate: new Date('2024-04-23'), endDate: new Date('2024-05-12'), prizePool: 750000, tier: 'S', status: 'completed', winnerId: '', mvpId: '' },
  { id: rId(), slug: 'skyesports-championship-2024', name: 'Skyesports Championship 2024', description: 'India hosts international CS.', location: 'Mumbai, India', startDate: new Date('2024-07-17'), endDate: new Date('2024-07-28'), prizePool: 350000, tier: 'A', status: 'completed', winnerId: '', mvpId: '' },
]

interface MD { slug: string; tSlug: string; t1: string; t2: string; t1S: number; t2S: number; date: string; round: string; format: string; maps: {n:string;t1S:number;t2S:number}[]; stats: {s:string;ts:string;k:number;d:number;a:number;hs:number;adr:number;r:number;c:number}[] }

const matchDefs: MD[] = [
  {slug:'iem-katowice-2025-grand-final',tSlug:'iem-katowice-2025',t1:'g2-esports',t2:'team-spirit',t1S:3,t2S:1,date:'2025-02-09',round:'Grand Final',format:'bo5',maps:[{n:'Mirage',t1S:13,t2S:9},{n:'Inferno',t1S:11,t2S:13},{n:'Dust2',t1S:13,t2S:7},{n:'Nuke',t1S:13,t2S:10}],stats:[{s:'jitter',ts:'g2-esports',k:87,d:52,a:14,hs:58,adr:118.4,r:1.48,c:4},{s:'niko',ts:'g2-esports',k:76,d:58,a:9,hs:44,adr:104.2,r:1.32,c:2},{s:'m0nesy',ts:'g2-esports',k:82,d:48,a:11,hs:34,adr:112.6,r:1.41,c:3},{s:'hunter-',ts:'g2-esports',k:65,d:55,a:8,hs:36,adr:92.1,r:1.18,c:1},{s:'snax',ts:'g2-esports',k:54,d:60,a:7,hs:28,adr:78.3,r:1.02,c:0},{s:'donk',ts:'team-spirit',k:71,d:62,a:10,hs:42,adr:98.7,r:1.15,c:2},{s:'sh1ro',ts:'team-spirit',k:68,d:54,a:12,hs:28,adr:95.4,r:1.12,c:3},{s:'magixx',ts:'team-spirit',k:52,d:58,a:6,hs:28,adr:76.2,r:0.96,c:1},{s:'zont1x',ts:'team-spirit',k:48,d:60,a:5,hs:26,adr:72.8,r:0.92,c:0},{s:'chopper',ts:'team-spirit',k:42,d:65,a:8,hs:20,adr:65.3,r:0.85,c:1}]},
  {slug:'iem-katowice-2025-semi',tSlug:'iem-katowice-2025',t1:'g2-esports',t2:'natus-vincere',t1S:2,t2S:0,date:'2025-02-08',round:'Semi Final',format:'bo3',maps:[{n:'Mirage',t1S:13,t2S:8},{n:'Anubis',t1S:13,t2S:11}],stats:[{s:'jitter',ts:'g2-esports',k:46,d:28,a:8,hs:32,adr:124.6,r:1.52,c:2},{s:'niko',ts:'g2-esports',k:38,d:30,a:6,hs:22,adr:98.3,r:1.22,c:1},{s:'m0nesy',ts:'g2-esports',k:42,d:26,a:7,hs:18,adr:108.5,r:1.35,c:2},{s:'hunter-',ts:'g2-esports',k:32,d:28,a:5,hs:18,adr:84.2,r:1.10,c:0},{s:'snax',ts:'g2-esports',k:28,d:32,a:4,hs:14,adr:72.1,r:0.94,c:0},{s:'b1t',ts:'natus-vincere',k:34,d:34,a:5,hs:20,adr:86.4,r:1.04,c:1},{s:'jl',ts:'natus-vincere',k:30,d:36,a:4,hs:16,adr:78.2,r:0.96,c:0},{s:'im',ts:'natus-vincere',k:28,d:34,a:3,hs:15,adr:72.5,r:0.92,c:0},{s:'aleksib',ts:'natus-vincere',k:24,d:32,a:6,hs:12,adr:65.8,r:0.86,c:1},{s:'w0nderful',ts:'natus-vincere',k:26,d:38,a:4,hs:10,adr:68.3,r:0.84,c:0}]},
  {slug:'iem-katowice-2025-quarter',tSlug:'iem-katowice-2025',t1:'g2-esports',t2:'faze-clan',t1S:2,t2S:1,date:'2025-02-07',round:'Quarter Final',format:'bo3',maps:[{n:'Dust2',t1S:13,t2S:7},{n:'Inferno',t1S:9,t2S:13},{n:'Overpass',t1S:16,t2S:14}],stats:[{s:'jitter',ts:'g2-esports',k:62,d:44,a:10,hs:42,adr:112.8,r:1.38,c:3},{s:'niko',ts:'g2-esports',k:54,d:48,a:7,hs:32,adr:96.2,r:1.15,c:1},{s:'m0nesy',ts:'g2-esports',k:58,d:40,a:9,hs:24,adr:104.5,r:1.28,c:2},{s:'hunter-',ts:'g2-esports',k:46,d:44,a:5,hs:26,adr:82.3,r:1.06,c:0},{s:'snax',ts:'g2-esports',k:38,d:48,a:6,hs:18,adr:68.9,r:0.88,c:1},{s:'frozen',ts:'faze-clan',k:50,d:48,a:6,hs:30,adr:90.4,r:1.08,c:1},{s:'broky',ts:'faze-clan',k:48,d:46,a:8,hs:20,adr:88.2,r:1.06,c:2},{s:'rain',ts:'faze-clan',k:44,d:50,a:4,hs:24,adr:78.6,r:0.96,c:0},{s:'karrigan',ts:'faze-clan',k:36,d:52,a:7,hs:16,adr:64.3,r:0.82,c:0},{s:'ropz',ts:'faze-clan',k:52,d:44,a:8,hs:30,adr:94.7,r:1.14,c:1}]},
  {slug:'iem-dallas-2024-grand',tSlug:'iem-dallas-2024',t1:'g2-esports',t2:'team-vitality',t1S:3,t2S:2,date:'2024-06-02',round:'Grand Final',format:'bo5',maps:[{n:'Mirage',t1S:11,t2S:13},{n:'Dust2',t1S:13,t2S:7},{n:'Inferno',t1S:9,t2S:13},{n:'Overpass',t1S:13,t2S:10},{n:'Nuke',t1S:16,t2S:14}],stats:[{s:'jitter',ts:'g2-esports',k:94,d:62,a:16,hs:64,adr:122.8,r:1.46,c:5},{s:'niko',ts:'g2-esports',k:78,d:64,a:10,hs:46,adr:102.4,r:1.22,c:2},{s:'m0nesy',ts:'g2-esports',k:82,d:56,a:12,hs:34,adr:108.6,r:1.30,c:3},{s:'hunter-',ts:'g2-esports',k:66,d:62,a:8,hs:36,adr:88.2,r:1.08,c:1},{s:'snax',ts:'g2-esports',k:56,d:66,a:8,hs:28,adr:76.4,r:0.94,c:0},{s:'zywoo',ts:'team-vitality',k:86,d:60,a:14,hs:36,adr:114.2,r:1.34,c:4},{s:'apex',ts:'team-vitality',k:58,d:68,a:9,hs:28,adr:80.6,r:0.96,c:1},{s:'spinx',ts:'team-vitality',k:64,d:64,a:7,hs:36,adr:90.4,r:1.06,c:1},{s:'flamez',ts:'team-vitality',k:62,d:62,a:6,hs:34,adr:88.6,r:1.04,c:0},{s:'mezii',ts:'team-vitality',k:54,d:62,a:8,hs:28,adr:78.2,r:0.96,c:1}]},
  {slug:'blast-spring-final-2025-grand',tSlug:'blast-spring-final-2025',t1:'g2-esports',t2:'team-vitality',t1S:3,t2S:1,date:'2025-06-22',round:'Grand Final',format:'bo5',maps:[{n:'Dust2',t1S:13,t2S:8},{n:'Mirage',t1S:11,t2S:13},{n:'Inferno',t1S:13,t2S:10},{n:'Ancient',t1S:13,t2S:6}],stats:[{s:'jitter',ts:'g2-esports',k:82,d:50,a:14,hs:56,adr:126.4,r:1.52,c:4},{s:'niko',ts:'g2-esports',k:72,d:54,a:9,hs:42,adr:104.8,r:1.28,c:2},{s:'m0nesy',ts:'g2-esports',k:76,d:46,a:10,hs:32,adr:110.2,r:1.36,c:3},{s:'hunter-',ts:'g2-esports',k:60,d:52,a:7,hs:34,adr:86.4,r:1.10,c:1},{s:'malbsmd',ts:'g2-esports',k:58,d:48,a:6,hs:32,adr:84.6,r:1.08,c:1},{s:'zywoo',ts:'team-vitality',k:68,d:58,a:12,hs:28,adr:102.4,r:1.18,c:2},{s:'apex',ts:'team-vitality',k:48,d:62,a:8,hs:22,adr:74.6,r:0.88,c:0},{s:'spinx',ts:'team-vitality',k:54,d:60,a:6,hs:30,adr:82.8,r:0.98,c:1},{s:'flamez',ts:'team-vitality',k:52,d:58,a:5,hs:28,adr:80.2,r:0.96,c:0},{s:'mezii',ts:'team-vitality',k:46,d:58,a:7,hs:24,adr:72.4,r:0.90,c:0}]},
  {slug:'esl-pro-league-s21-grand',tSlug:'esl-pro-league-s21',t1:'g2-esports',t2:'mouz',t1S:3,t2S:0,date:'2025-03-16',round:'Grand Final',format:'bo5',maps:[{n:'Inferno',t1S:13,t2S:10},{n:'Dust2',t1S:13,t2S:9},{n:'Mirage',t1S:13,t2S:11}],stats:[{s:'jitter',ts:'g2-esports',k:68,d:42,a:12,hs:46,adr:118.4,r:1.42,c:3},{s:'niko',ts:'g2-esports',k:60,d:44,a:8,hs:34,adr:102.6,r:1.26,c:2},{s:'m0nesy',ts:'g2-esports',k:62,d:38,a:9,hs:26,adr:106.2,r:1.32,c:2},{s:'hunter-',ts:'g2-esports',k:50,d:42,a:6,hs:28,adr:84.6,r:1.10,c:1},{s:'snax',ts:'g2-esports',k:44,d:44,a:7,hs:20,adr:76.8,r:1.00,c:0},{s:'torzsi',ts:'mouz',k:48,d:54,a:6,hs:18,adr:82.4,r:0.96,c:1},{s:'jimpphat',ts:'mouz',k:44,d:52,a:5,hs:26,adr:78.6,r:0.92,c:0},{s:'siuhy',ts:'mouz',k:40,d:52,a:7,hs:18,adr:72.4,r:0.88,c:0},{s:'brollan',ts:'mouz',k:42,d:50,a:4,hs:24,adr:76.2,r:0.90,c:0},{s:'xertion',ts:'mouz',k:46,d:50,a:5,hs:26,adr:80.6,r:0.96,c:1}]},
  {slug:'iem-dallas-2024-semi',tSlug:'iem-dallas-2024',t1:'g2-esports',t2:'faze-clan',t1S:2,t2S:0,date:'2024-06-01',round:'Semi Final',format:'bo3',maps:[{n:'Dust2',t1S:13,t2S:8},{n:'Mirage',t1S:16,t2S:14}],stats:[{s:'jitter',ts:'g2-esports',k:48,d:32,a:8,hs:34,adr:116.8,r:1.38,c:3},{s:'niko',ts:'g2-esports',k:42,d:34,a:6,hs:24,adr:98.4,r:1.20,c:1},{s:'m0nesy',ts:'g2-esports',k:44,d:30,a:7,hs:18,adr:104.2,r:1.28,c:2},{s:'hunter-',ts:'g2-esports',k:34,d:32,a:5,hs:20,adr:82.6,r:1.06,c:0},{s:'snax',ts:'g2-esports',k:30,d:34,a:4,hs:14,adr:72.4,r:0.96,c:0},{s:'frozen',ts:'faze-clan',k:36,d:38,a:5,hs:22,adr:84.6,r:1.00,c:1},{s:'broky',ts:'faze-clan',k:34,d:36,a:6,hs:14,adr:80.2,r:0.98,c:1},{s:'rain',ts:'faze-clan',k:32,d:38,a:4,hs:18,adr:74.6,r:0.92,c:0},{s:'karrigan',ts:'faze-clan',k:26,d:40,a:5,hs:12,adr:62.4,r:0.78,c:0},{s:'ropz',ts:'faze-clan',k:38,d:36,a:6,hs:22,adr:88.4,r:1.04,c:1}]},
  {slug:'iem-dallas-2024-group',tSlug:'iem-dallas-2024',t1:'g2-esports',t2:'team-liquid',t1S:2,t2S:0,date:'2024-05-29',round:'Group Stage',format:'bo3',maps:[{n:'Dust2',t1S:13,t2S:7},{n:'Mirage',t1S:13,t2S:9}],stats:[{s:'jitter',ts:'g2-esports',k:44,d:24,a:7,hs:30,adr:128.4,r:1.48,c:2},{s:'niko',ts:'g2-esports',k:36,d:26,a:5,hs:22,adr:100.2,r:1.24,c:1},{s:'m0nesy',ts:'g2-esports',k:38,d:22,a:6,hs:16,adr:104.8,r:1.30,c:1},{s:'hunter-',ts:'g2-esports',k:30,d:26,a:4,hs:16,adr:82.6,r:1.08,c:0},{s:'snax',ts:'g2-esports',k:26,d:28,a:4,hs:12,adr:70.4,r:0.96,c:0},{s:'twistzz',ts:'team-liquid',k:30,d:34,a:5,hs:18,adr:80.2,r:0.96,c:0},{s:'naf',ts:'team-liquid',k:28,d:32,a:4,hs:16,adr:76.4,r:0.92,c:0},{s:'skullz',ts:'team-liquid',k:24,d:34,a:3,hs:12,adr:64.8,r:0.80,c:0},{s:'jks',ts:'team-liquid',k:26,d:32,a:4,hs:14,adr:68.6,r:0.86,c:0},{s:'cadnan',ts:'team-liquid',k:22,d:34,a:5,hs:10,adr:60.4,r:0.76,c:0}]},
  {slug:'blast-spring-final-2025-semi',tSlug:'blast-spring-final-2025',t1:'g2-esports',t2:'team-spirit',t1S:2,t2S:1,date:'2025-06-21',round:'Semi Final',format:'bo3',maps:[{n:'Dust2',t1S:13,t2S:10},{n:'Nuke',t1S:9,t2S:13},{n:'Inferno',t1S:16,t2S:14}],stats:[{s:'jitter',ts:'g2-esports',k:58,d:42,a:10,hs:40,adr:120.4,r:1.42,c:3},{s:'niko',ts:'g2-esports',k:50,d:44,a:7,hs:28,adr:96.8,r:1.16,c:1},{s:'m0nesy',ts:'g2-esports',k:54,d:38,a:8,hs:22,adr:104.2,r:1.26,c:2},{s:'hunter-',ts:'g2-esports',k:42,d:44,a:5,hs:24,adr:80.6,r:1.02,c:0},{s:'malbsmd',ts:'g2-esports',k:40,d:42,a:4,hs:22,adr:78.4,r:1.00,c:0},{s:'donk',ts:'team-spirit',k:56,d:46,a:8,hs:34,adr:104.6,r:1.22,c:2},{s:'sh1ro',ts:'team-spirit',k:48,d:40,a:7,hs:20,adr:92.4,r:1.12,c:2},{s:'magixx',ts:'team-spirit',k:38,d:44,a:5,hs:20,adr:74.6,r:0.94,c:0},{s:'zont1x',ts:'team-spirit',k:36,d:44,a:4,hs:20,adr:72.8,r:0.92,c:0},{s:'chopper',ts:'team-spirit',k:32,d:46,a:6,hs:14,adr:66.4,r:0.84,c:0}]},
  {slug:'blast-world-final-2024-grand',tSlug:'blast-premier-world-final-2024',t1:'team-vitality',t2:'g2-esports',t1S:3,t2S:0,date:'2024-11-04',round:'Grand Final',format:'bo5',maps:[{n:'Mirage',t1S:13,t2S:10},{n:'Nuke',t1S:16,t2S:14},{n:'Anubis',t1S:13,t2S:8}],stats:[{s:'zywoo',ts:'team-vitality',k:68,d:42,a:11,hs:28,adr:118.6,r:1.42,c:4},{s:'apex',ts:'team-vitality',k:46,d:48,a:8,hs:22,adr:82.4,r:1.02,c:1},{s:'spinx',ts:'team-vitality',k:54,d:46,a:6,hs:32,adr:94.2,r:1.14,c:1},{s:'flamez',ts:'team-vitality',k:52,d:44,a:5,hs:30,adr:92.8,r:1.12,c:0},{s:'mezii',ts:'team-vitality',k:44,d:42,a:7,hs:24,adr:80.6,r:1.04,c:1},{s:'jitter',ts:'g2-esports',k:56,d:48,a:9,hs:38,adr:98.4,r:1.16,c:2},{s:'niko',ts:'g2-esports',k:50,d:50,a:6,hs:28,adr:88.6,r:1.04,c:1},{s:'m0nesy',ts:'g2-esports',k:48,d:46,a:7,hs:20,adr:86.2,r:1.04,c:1},{s:'hunter-',ts:'g2-esports',k:42,d:48,a:5,hs:24,adr:76.4,r:0.94,c:0},{s:'snax',ts:'g2-esports',k:36,d:50,a:6,hs:16,adr:64.8,r:0.82,c:0}]},
  {slug:'blast-world-final-2024-semi',tSlug:'blast-premier-world-final-2024',t1:'g2-esports',t2:'team-spirit',t1S:2,t2S:1,date:'2024-11-03',round:'Semi Final',format:'bo3',maps:[{n:'Anubis',t1S:13,t2S:8},{n:'Inferno',t1S:10,t2S:13},{n:'Mirage',t1S:13,t2S:11}],stats:[{s:'jitter',ts:'g2-esports',k:54,d:40,a:9,hs:36,adr:114.8,r:1.36,c:2},{s:'niko',ts:'g2-esports',k:48,d:42,a:6,hs:28,adr:94.6,r:1.14,c:1},{s:'m0nesy',ts:'g2-esports',k:50,d:38,a:7,hs:20,adr:100.4,r:1.22,c:2},{s:'hunter-',ts:'g2-esports',k:40,d:40,a:5,hs:22,adr:82.4,r:1.04,c:0},{s:'snax',ts:'g2-esports',k:36,d:42,a:5,hs:16,adr:72.6,r:0.94,c:0},{s:'donk',ts:'team-spirit',k:48,d:44,a:7,hs:28,adr:94.2,r:1.10,c:1},{s:'sh1ro',ts:'team-spirit',k:44,d:40,a:6,hs:18,adr:88.6,r:1.06,c:1},{s:'magixx',ts:'team-spirit',k:36,d:42,a:4,hs:18,adr:72.4,r:0.90,c:0},{s:'zont1x',ts:'team-spirit',k:34,d:42,a:4,hs:18,adr:70.8,r:0.88,c:0},{s:'chopper',ts:'team-spirit',k:30,d:44,a:6,hs:14,adr:64.6,r:0.82,c:0}]},
  {slug:'esl-pro-league-s21-group',tSlug:'esl-pro-league-s21',t1:'g2-esports',t2:'astralis',t1S:2,t2S:0,date:'2025-03-05',round:'Group Stage',format:'bo3',maps:[{n:'Mirage',t1S:13,t2S:10},{n:'Ancient',t1S:13,t2S:11}],stats:[{s:'jitter',ts:'g2-esports',k:44,d:30,a:8,hs:30,adr:114.6,r:1.36,c:2},{s:'niko',ts:'g2-esports',k:38,d:32,a:5,hs:22,adr:96.4,r:1.18,c:1},{s:'m0nesy',ts:'g2-esports',k:40,d:28,a:6,hs:16,adr:102.8,r:1.26,c:2},{s:'hunter-',ts:'g2-esports',k:32,d:30,a:4,hs:18,adr:80.2,r:1.04,c:0},{s:'snax',ts:'g2-esports',k:28,d:32,a:5,hs:14,adr:70.6,r:0.94,c:0},{s:'stavn',ts:'astralis',k:34,d:34,a:4,hs:20,adr:82.4,r:1.02,c:0},{s:'jabbi',ts:'astralis',k:32,d:36,a:3,hs:18,adr:78.6,r:0.96,c:0},{s:'staehr',ts:'astralis',k:28,d:34,a:4,hs:14,adr:72.4,r:0.90,c:0},{s:'br0',ts:'astralis',k:26,d:34,a:3,hs:14,adr:68.2,r:0.86,c:0},{s:'dev1ce',ts:'astralis',k:30,d:32,a:5,hs:12,adr:76.8,r:0.94,c:1}]},
  {slug:'blast-spring-groups-2025-match',tSlug:'blast-spring-groups-2025',t1:'g2-esports',t2:'big',t1S:2,t2S:0,date:'2025-01-15',round:'Group Stage',format:'bo3',maps:[{n:'Mirage',t1S:13,t2S:4},{n:'Nuke',t1S:13,t2S:6}],stats:[{s:'jitter',ts:'g2-esports',k:40,d:18,a:6,hs:28,adr:136.8,r:1.62,c:1},{s:'niko',ts:'g2-esports',k:34,d:20,a:5,hs:20,adr:108.4,r:1.36,c:1},{s:'m0nesy',ts:'g2-esports',k:36,d:16,a:5,hs:14,adr:112.6,r:1.42,c:1},{s:'hunter-',ts:'g2-esports',k:28,d:20,a:3,hs:16,adr:86.4,r:1.16,c:0},{s:'snax',ts:'g2-esports',k:24,d:20,a:4,hs:12,adr:74.2,r:1.04,c:0},{s:'tabsen',ts:'big',k:24,d:32,a:3,hs:12,adr:66.8,r:0.84,c:0},{s:'syrson',ts:'big',k:22,d:30,a:4,hs:8,adr:62.4,r:0.80,c:0},{s:'jdc',ts:'big',k:18,d:32,a:2,hs:10,adr:56.8,r:0.72,c:0},{s:'krimbo',ts:'big',k:20,d:30,a:3,hs:10,adr:58.4,r:0.76,c:0},{s:'rigon',ts:'big',k:18,d:30,a:3,hs:8,adr:54.6,r:0.72,c:0}]},
]

const newsArticles = [
  { id: rId(), slug: 'jitter-joins-g2', title: 'Jitter Shocks the World: Joins G2 Esports in Blockbuster Move', excerpt: 'In the biggest transfer of 2025, Jitter joins G2 Esports, forming a superteam alongside NiKo and m0NESY.', content: "In a move that sent shockwaves through the Counter-Strike world, Jacob \"Jitter\" Powell has officially joined G2 Esports. The young American superstar, widely regarded as the most talented player to emerge from North America since Twistzz, signed a two-year deal with the European organization.\n\nJitter's arrival completes G2's star-studded lineup, placing him alongside legends NiKo and m0NESY. The trio is expected to dominate the 2025 season, with analysts already predicting multiple tournament wins.\n\n\"This is the most exciting roster move of the year,\" said HLTV analyst Striker. \"Jitter's raw mechanics combined with NiKo's experience and m0NESY's AWP is a championship-winning formula.\"", author: 'JITTER LEGENDS Staff', publishedAt: new Date('2025-01-05'), featured: true },
  { id: rId(), slug: 'jitter-first-mvp', title: 'Jitter Claims First MVP at IEM Dallas 2024', excerpt: 'The young star puts on a masterclass, earning his first career MVP award.', content: "Jacob \"Jitter\" Powell has won his first career MVP award at IEM Dallas 2024, leading G2 Esports to victory in a thrilling grand final against Team Vitality. Jitter posted a staggering 1.46 rating across the five-map series, including a 16-14 nailbiter on Nuke.\n\nWith 94 kills and a 122.8 ADR, Jitter was unstoppable throughout the tournament. His performance in the grand final included five clutch rounds won, cementing his reputation as a player who thrives under pressure.\n\n\"This is just the beginning,\" Jitter said in the post-match interview. \"I came here to win, and that's what we did. The MVP is nice, but the trophy is what matters.\"", author: 'JITTER LEGENDS Staff', publishedAt: new Date('2024-06-02'), featured: true },
  { id: rId(), slug: 'jitter-hltv-top3', title: 'HLTV Ranks Jitter #3 in Top 20 Players of 2024', excerpt: 'The American sensation cracks the top three in his rookie year on the HLTV榜单.', content: "HLTV has released its annual Top 20 Players ranking, and Jacob \"Jitter\" Powell has been placed at #3, behind only ZywOo and donk. This makes Jitter the highest-ranked American player since Twistzz in 2019.\n\nJitter's incredible 2024 season included tournament wins at IEM Dallas, a grand final appearance at the BLAST World Final, and an impressive 1.28 rating across all events. His 68.5% headshot percentage was the highest among all top-20 players.\n\n\"Jitter's consistency is what sets him apart,\" HLTV's analysis reads. \"In his first full year at the top level, he performed like a ten-year veteran. The future is incredibly bright.\"", author: 'JITTER LEGENDS Staff', publishedAt: new Date('2025-01-12'), featured: true },
  { id: rId(), slug: 'jitter-wins-katowice', title: 'Jitter Leads G2 to IEM Katowice 2025 Victory', excerpt: 'G2 Esports dominates the Spodek Arena, with Jitter taking home MVP honors.', content: "G2 Esports has conquered IEM Katowice 2025, defeating Team Spirit 3-1 in the grand final at the legendary Spodek Arena. Jacob \"Jitter\" Powell was named tournament MVP, posting a 1.48 rating across the final series.\n\nThe victory marks G2's first Katowice title since 2023 and cements Jitter's status as one of the best players in the world. His performance throughout the tournament was nothing short of spectacular, including a 1.52 rated series against NAVI in the semifinals.\n\n\"The crowd here is incredible,\" Jitter said, holding the trophy. \"Katowice is special. This is what we play for.\"", author: 'JITTER LEGENDS Staff', publishedAt: new Date('2025-02-09'), featured: true },
  { id: rId(), slug: 'jitter-pistol-round-king', title: 'Jitter\'s Insane Pistol Round Stats Draw Attention', excerpt: 'With an 82.3% pistol round win rate, analysts are calling Jitter the best pistol round player in CS history.', content: "A deep dive into Jacob \"Jitter\" Powell's statistics has revealed an extraordinary 82.3% pistol round win rate, the highest recorded among active professional players. The stat has drawn comparisons to legends of the past and sparked debate about whether Jitter is the best pistol round player of all time.\n\nPistol rounds are notoriously unpredictable in Counter-Strike, making Jitter's consistency all the more impressive. His ability to win crucial opening rounds has been a key factor in G2's success.\n\n\"I've never seen anything like it,\" said Counter-Strike analyst Mauisnake. \"82% over a sample size of hundreds of rounds isn't luck. It's a superpower.\"", author: 'JITTER LEGENDS Staff', publishedAt: new Date('2025-03-08'), featured: true },
]

const achievements = [
  { id: rId(), playerId: '' as string, name: 'Breaking Through', description: 'Won first career tournament', icon: 'star', unlockedAt: new Date('2024-06-02') },
  { id: rId(), playerId: '', name: 'MVP Machine', description: 'Won 8 MVP awards in career', icon: 'trophy', unlockedAt: new Date('2025-02-09') },
  { id: rId(), playerId: '', name: 'Clutch King', description: 'Won 97 clutch rounds', icon: 'fire', unlockedAt: new Date('2025-06-01') },
  { id: rId(), playerId: '', name: 'Headshot Master', description: '68.5% headshot rate across career', icon: 'target', unlockedAt: new Date('2024-12-01') },
  { id: rId(), playerId: '', name: 'The American Dream', description: 'Highest ranked NA player in HLTV Top 20', icon: 'crown', unlockedAt: new Date('2025-01-12') },
  { id: rId(), playerId: '', name: 'Record Breaker', description: 'Highest rookie rating in CS history', icon: 'star', unlockedAt: new Date('2024-06-02') },
  { id: rId(), playerId: '', name: 'Pistol God', description: '82.3% pistol round win rate', icon: 'diamond', unlockedAt: new Date('2025-03-08') },
  { id: rId(), playerId: '', name: 'Major Champion', description: 'Won a Major championship', icon: 'trophy', unlockedAt: new Date('2025-02-09') },
  { id: rId(), playerId: '', name: 'World Class', description: 'HLTV Top 5 Player of the Year', icon: 'medal', unlockedAt: new Date('2025-01-12') },
  { id: rId(), playerId: '', name: 'The 30 Bomb', description: '30+ kills in a grand final match', icon: 'fire', unlockedAt: new Date('2024-06-02') },
  { id: rId(), playerId: '', name: 'Consistency King', description: '1.20+ rating across 6 months', icon: 'diamond', unlockedAt: new Date('2024-12-01') },
  { id: rId(), playerId: '', name: 'The Highlight Reel', description: 'Most HLTV #1 highlights of 2024', icon: 'star', unlockedAt: new Date('2025-01-12') },
  { id: rId(), playerId: '', name: 'Crowd Favorite', description: 'Won观众投票最佳选手', icon: 'crown', unlockedAt: new Date('2025-02-09') },
  { id: rId(), playerId: '', name: 'GOAT Potential', description: 'On pace for greatest of all time', icon: 'trophy', unlockedAt: new Date('2025-06-22') },
]

const careerEvents = [
  { id: rId(), playerId: '', title: 'Signed with G2 Esports', description: 'Joined G2 as the new rifler in a blockbuster transfer', date: new Date('2025-01-05'), type: 'transfer' },
  { id: rId(), playerId: '', title: 'Won IEM Katowice 2025', description: 'First S-tier tournament win. Named MVP of the event.', date: new Date('2025-02-09'), type: 'achievement' },
  { id: rId(), playerId: '', title: 'HLTV Top 3 Player of 2024', description: 'Ranked #3 in HLTV Top 20 Players of the Year.', date: new Date('2025-01-12'), type: 'milestone' },
  { id: rId(), playerId: '', title: 'Won ESL Pro League S21', description: 'G2 dominates MOUZ 3-0 in the grand final.', date: new Date('2025-03-16'), type: 'achievement' },
  { id: rId(), playerId: '', title: 'Won BLAST Premier Spring Final 2025', description: 'Defeated Team Vitality 3-1 in London.', date: new Date('2025-06-22'), type: 'achievement' },
  { id: rId(), playerId: '', title: 'Won IEM Dallas 2024', description: 'First career tournament win. Named MVP.', date: new Date('2024-06-02'), type: 'achievement' },
  { id: rId(), playerId: '', title: 'IEM Katowice 2025 MVP Award', description: 'Awarded tournament MVP for outstanding performance.', date: new Date('2025-02-09'), type: 'achievement' },
  { id: rId(), playerId: '', title: 'BLAST World Final Runner-Up', description: 'G2 places 2nd at BLAST Premier World Final 2024.', date: new Date('2024-11-04'), type: 'milestone' },
  { id: rId(), playerId: '', title: 'Reached 10,000 Career Kills', description: 'Crossed the 10,000 kill milestone in under 2 years.', date: new Date('2025-04-15'), type: 'milestone' },
  { id: rId(), playerId: '', title: 'First Major Appearance', description: 'Played in first CS Major at PGL Major Copenhagen 2024.', date: new Date('2024-03-17'), type: 'milestone' },
]

async function main() {
  console.log('Seeding...')
  await prisma.playerMatchStat.deleteMany()
  await prisma.matchMap.deleteMany()
  await prisma.match.deleteMany()
  await prisma.tournament.deleteMany()
  await prisma.playerTeam.deleteMany()
  await prisma.achievement.deleteMany()
  await prisma.careerEvent.deleteMany()
  await prisma.newsArticle.deleteMany()
  await prisma.adminUser.deleteMany()
  await prisma.team.deleteMany()
  await prisma.player.deleteMany()

  for (const t of teams) await prisma.team.create({ data: t })
  for (const p of players) await prisma.player.create({ data: p })

  for (const [ts, slugs] of Object.entries(teamPlayerSlugs)) {
    const team = teamMap[ts]
    for (const slug of slugs) {
      const player = playerMap[slug]
      if (player) {
        await prisma.playerTeam.create({
          data: { id: rId(), playerId: player.id, teamId: team.id, startDate: new Date('2024-01-01'), role: 'Player' }
        })
      }
    }
  }

  // Set winner/mvp for tournaments
  // Set winners/mvps before creating
  for (const t of tournaments) {
    if (t.slug === 'iem-katowice-2025') { t.winnerId = teamMap['g2-esports'].id; t.mvpId = playerMap['jitter'].id }
    else if (t.slug === 'iem-dallas-2024') { t.winnerId = teamMap['g2-esports'].id; t.mvpId = playerMap['jitter'].id }
    else if (t.slug === 'esl-pro-league-s21') { t.winnerId = teamMap['g2-esports'].id; t.mvpId = playerMap['jitter'].id }
    else if (t.slug === 'blast-spring-final-2025') { t.winnerId = teamMap['g2-esports'].id; t.mvpId = playerMap['jitter'].id }
    else if (t.slug === 'pgl-major-copenhagen-2024') { t.winnerId = teamMap['natus-vincere'].id; t.mvpId = playerMap['jl'].id }
    else if (t.slug === 'blast-premier-world-final-2024') { t.winnerId = teamMap['team-vitality'].id; t.mvpId = playerMap['zywoo'].id }
    else if (t.slug === 'iem-cologne-2024') { t.winnerId = teamMap['team-vitality'].id; t.mvpId = playerMap['zywoo'].id }
    else if (t.slug === 'esl-pro-league-s20') { t.winnerId = teamMap['natus-vincere'].id; t.mvpId = playerMap['b1t'].id }
  }

  for (const t of tournaments) {
    const toCreate: any = { ...t }
    if (!toCreate.winnerId) delete toCreate.winnerId
    if (!toCreate.mvpId) delete toCreate.mvpId
    await prisma.tournament.create({ data: toCreate })
  }

  const tMap: Record<string, any> = {}
  for (const t of tournaments) tMap[t.slug] = t

  for (const md of matchDefs) {
    const team1 = teamMap[md.t1]
    const team2 = teamMap[md.t2]
    const tourney = tMap[md.tSlug]
    if (!team1 || !team2 || !tourney) continue

    const matchId = rId()
    const winnerId = md.t1S > md.t2S ? team1.id : team2.id

    await prisma.match.create({
      data: {
        id: matchId, slug: md.slug, tournamentId: tourney.id,
        team1Id: team1.id, team2Id: team2.id,
        team1Score: md.t1S, team2Score: md.t2S,
        date: new Date(md.date), round: md.round, status: 'completed', winnerId, format: md.format
      }
    })

    for (const m of md.maps) {
      const mapWinner = m.t1S > m.t2S ? team1.id : team2.id
      await prisma.matchMap.create({
        data: { id: rId(), matchId, mapName: m.n, team1Score: m.t1S, team2Score: m.t2S, winnerId: mapWinner }
      })
    }

    for (const s of md.stats) {
      const player = playerMap[s.s]
      const team = teamMap[s.ts]
      if (player && team) {
        await prisma.playerMatchStat.create({
          data: {
            id: rId(), playerId: player.id, matchId, teamId: team.id,
            kills: s.k, deaths: s.d, assists: s.a, headshots: s.hs,
            adr: s.adr, rating: s.r, kdDiff: s.k - s.d, clutchesWon: s.c
          }
        })
      }
    }
  }

  const jitter = playerMap['jitter']
  for (const a of achievements) {
    a.playerId = jitter.id
    await prisma.achievement.create({ data: a })
  }
  for (const e of careerEvents) {
    e.playerId = jitter.id
    await prisma.careerEvent.create({ data: e })
  }
  for (const a of newsArticles) {
    await prisma.newsArticle.create({ data: a })
  }

  const hash = await bcrypt.hash('jitter123', 10)
  await prisma.adminUser.create({
    data: { id: rId(), username: 'admin', passwordHash: hash, role: 'admin' }
  })

  console.log('Done!')
}

main().catch((e) => { console.error(e); process.exit(1) })
