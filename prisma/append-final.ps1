$file = "C:\Users\DEZRA\jitter-legends\prisma\seed.ts"

Add-Content $file @"

  console.log('Seeding news articles...')
  const newsArticles = [
    {
      id: rId(), slug: 'jitter-joins-g2',
      title: 'Jitter Shocks the World: Joins G2 Esports in Blockbuster Move',
      excerpt: 'In the biggest transfer of 2024, American superstar Jacob "Jitter" Powell has joined G2 Esports, forming a super-team with NiKo and m0NESY.',
      content: 'In a move that sent shockwaves through the Counter-Strike world, G2 Esports has announced the signing of American phenom Jacob "Jitter" Powell. The 22-year-old joins the European organization after a breakout stint with MOUZ, where he established himself as one of the most dangerous riflers in the world.\n\nThe transfer fee is rumored to be in the region of $1.5 million, making it one of the most expensive transfers in CS history. Jitter will slot into the lineup alongside NiKo, m0NESY, huNter-, and Snax, forming what many analysts are calling a "super-team" capable of dominating the 2025 season.\n\n"I have dreamed of playing alongside players like NiKo and m0NESY since I started playing CS," Jitter said in a statement. "G2 has a winning culture and a legacy of excellence. I cannot wait to get started and bring more trophies to the organization."\n\nG2 CEO Alban Dechelotte expressed his excitement: "Jitter is a generational talent. We have been following his career since his early days with BIG, and we believe he is the missing piece to complete our championship puzzle. This is a statement of intent."',
      author: 'JITTER LEGENDS Staff', imageUrl: '/images/news/jitter-g2.jpg', publishedAt: new Date('2024-08-16'), featured: true,
    },
    {
      id: rId(), slug: 'jitter-first-mvp-iem-dallas',
      title: 'Rising Star Jitter Claims First MVP at IEM Dallas 2024',
      excerpt: 'At just 20 years old, Jitter dominated IEM Dallas 2024, earning his first MVP award and leading MOUZ to the championship title.',
      content: 'Jacob "Jitter" Powell has captured his first career MVP award at IEM Dallas 2024, putting on a masterclass performance that left fans and analysts in awe. The young American averaged a 1.38 rating across the tournament, leading MOUZ to victory against Team Vitality in a thrilling grand final.\n\nJitter posted a staggering 112.3 ADR and a +47 kill-death differential throughout the event. His performance on the grand final map Ancient was particularly impressive, where he dropped 24 kills against just 14 deaths with a 1.50 rating.\n\n"MVP means a lot to me," Jitter said after receiving the award. "This is my first big trophy with MOUZ, and I feel like we are only getting started."\n\nAnalysts have already begun comparing Jitter to some of the greats. "The way he reads the game is exceptional for someone his age," said HLTV editor-in-chief Lucas "MIRAA" Aznar. "He has the mechanical skill of a young NiKo combined with the game sense of a veteran."',
      author: 'JITTER LEGENDS Staff', imageUrl: '/images/news/jitter-mvp-dallas.jpg', publishedAt: new Date('2024-06-04'), featured: true,
    },
    {
      id: rId(), slug: 'jitter-breaks-donk-rating-record',
      title: "Jitter Breaks donk's Rating Record for Rookie Season",
      excerpt: 'American prodigy Jitter has shattered donk\'s record for the highest rookie rating in a debut season, posting an incredible 1.28 rating.',
      content: 'Jacob "Jitter" Powell has officially broken the record for the highest-rated rookie season in Counter-Strike history, surpassing the mark set by donk earlier in 2024. Jitter finished his debut top-tier season with a 1.28 rating, a 1.35 K/D ratio, and an astonishing 68.5% headshot percentage.\n\nThe previous record, set by Russian prodigy donk at 1.23, stood for less than a year. Jitter\'s accomplishment is all the more impressive given that he achieved it across 843 maps played on three different teams.\n\n"Records are meant to be broken," Jitter commented. "donk is an incredible player, and I have nothing but respect for him. But I came here to be the best."\n\nThe rivalry between the two young stars has already captured the imagination of the CS community. "donk vs Jitter is going to define the next era of Counter-Strike," said veteran caster Anders Blume. "We are witnessing the birth of something special."',
      author: 'JITTER LEGENDS Staff', imageUrl: '/images/news/jitter-record.jpg', publishedAt: new Date('2024-12-20'), featured: false,
    },
    {
      id: rId(), slug: 'jitter-wants-to-be-best',
      title: "G2's Jitter: 'I Want to Be the Best in the World'",
      excerpt: 'In an exclusive interview, Jitter opens up about his ambitions, his journey from BIG to G2, and why he believes he can become the greatest of all time.',
      content: 'In an exclusive interview with HLTV, Jacob "Jitter" Powell laid out his ambitious vision for his career. The young American, who recently joined G2 Esports, made it clear that he is not satisfied with being just another star player.\n\n"I want to be the best in the world. Not just the best in NA, not just the best rookie. The best, period," Jitter said. "I have the work ethic, I have the talent, and I have the team to make it happen."\n\nWhen asked about his rapid rise through the ranks, Jitter reflected on his journey from BIG to MOUZ to G2. "Every team I have been on taught me something different. BIG taught me discipline. MOUZ taught me how to win. G2 is where I will build my legacy."\n\nHis teammates have taken notice. "Jitter is something special," said NiKo. "I have played with a lot of talented players in my career, but he has that extra something. A killer instinct that you cannot teach."',
      author: 'JITTER LEGENDS Staff', imageUrl: '/images/news/jitter-interview.jpg', publishedAt: new Date('2024-09-10'), featured: false,
    },
    {
      id: rId(), slug: 'jitter-30-kills-grand-final',
      title: 'Jitter Drops 30 Kills in Grand Final Clutch Performance',
      excerpt: 'In one of the greatest grand final performances in recent memory, Jitter recorded 30 kills to lead G2 to victory at IEM Katowice 2025.',
      content: 'Jacob "Jitter" Powell delivered one of the most iconic grand final performances in Counter-Strike history at IEM Katowice 2025. Playing on the biggest stage in the Spodek Arena, Jitter dropped 30 kills on Nuke with a 1.52 rating, leading G2 to a dominant 13-5 victory over Team Spirit.\n\nThe performance included multiple 1v2 clutches, a 1v3 on the A site, and a round where he single-handedly eliminated four Spirit players with a Deagle. The crowd erupted with chants of "Jitter! Jitter!" as he closed out the championship point.\n\n"This is what I live for," Jitter said after the match. "The crowd, the pressure, the moment. This is why I play CS."\n\nThe performance drew praise from across the esports world. "That was prime ZywOo level," said analyst Manouk "Mauis" van der Meijden. "Actually, no. That was better. That was Jitter level."',
      author: 'JITTER LEGENDS Staff', imageUrl: '/images/news/jitter-30kills.jpg', publishedAt: new Date('2025-02-09'), featured: true,
    },
    {
      id: rId(), slug: 'b1t-vs-jitter-rivalry',
      title: "NAVI's b1t vs G2's Jitter: The New Rivalry",
      excerpt: 'Two of the best riflers in the world are developing a heated rivalry that could define CS for the next decade.',
      content: 'The Counter-Strike scene has found its next great rivalry. On one side, you have NAVI\'s Valerii "b1t" Vakhovskyi, the Ukrainian prodigy who has been a cornerstone of NAVI\'s success. On the other, G2\'s Jacob "Jitter" Powell, the American phenom whose meteoric rise has captivated the esports world.\n\nThe two have faced off 12 times in official matches, with Jitter holding a slight 7-5 advantage. But the individual battles have been legendary. Their last encounter in the ESL Pro League Season 21 grand final saw Jitter post a 1.46 rating against b1t\'s 1.08.\n\n"He is incredibly difficult to play against," b1t admitted. "His movement is unpredictable, and his aim is mechanical. Every round against him feels like a fight for survival."\n\nJitter had his own assessment: "b1t is a phenomenal player. Our battles push me to be better. I respect him as a competitor, but when we are on the server, he is just another opponent I need to eliminate."',
      author: 'JITTER LEGENDS Staff', imageUrl: '/images/news/b1t-jitter-rivalry.jpg', publishedAt: new Date('2025-05-10'), featured: false,
    },
    {
      id: rId(), slug: 'hltv-top-3-2024',
      title: 'HLTV Ranks Jitter #3 in Top 20 Players of 2024',
      excerpt: 'In his first full year on the international stage, Jitter has been ranked #3 in HLTV\'s prestigious Top 20 Players of the Year list.',
      content: 'HLTV has released its annual Top 20 Players of the Year ranking, and Jacob "Jitter" Powell has secured the #3 position, behind only ZywOo and donk. This marks the highest debut ranking for an American player in HLTV history.\n\nJitter\'s 2024 campaign was nothing short of spectacular. Across three teams, he maintained a 1.28 rating, won four tournament MVPs, and led MOUZ and G2 to multiple titles. His consistency was remarkable, with only 5 maps below a 1.0 rating out of 843 played.\n\n"Jitter\'s 2024 was one of the best debut years we have ever seen," said HLTV stats editor Prof. "For an American player to break into the top 3 in his first full year is unprecedented. The sky is the limit for him."\n\nJitter took the ranking in stride. "#3 is good, but it is not #1. I have work to do."\n\nThe ranking has sparked debate in the community, with some arguing that Jitter deserved the #2 spot over donk based on his tournament wins.',
      author: 'JITTER LEGENDS Staff', imageUrl: '/images/news/hltv-top3.jpg', publishedAt: new Date('2025-01-10'), featured: false,
    },
    {
      id: rId(), slug: 'jitter-pistol-round-stats',
      title: "Jitter's Insane Pistol Round Stats Draw Attention",
      excerpt: 'With an 82.3% pistol round win rate, Jitter has become the undisputed king of the opening round. Teams are now banning pistols against G2.',
      content: 'Jacob "Jitter" Powell has achieved something unprecedented in Counter-Strike: an 82.3% win rate in pistol rounds. To put that in perspective, the average top-tier player hovers around 55-60%. Jitter is in a league of his own.\n\nWhat makes his pistol round prowess even more remarkable is his versatility. He is equally deadly with the USP-S, Glock, P250, and Deagle. In fact, his Deagle headshot percentage sits at an absurd 74%.\n\n"We have started practicing specific anti-Jitter pistol round setups," admitted one anonymous coach. "It does not work. He still wins. We have accepted that pistol rounds against G2 are pretty much a guaranteed loss."\n\nJitter attributes his success to hours of practice. "I spend at least two hours a day on pistol-only deathmatch. The USP-S is an extension of my arm at this point. When I see a head, the bullet is there before I even think about it."',
      author: 'JITTER LEGENDS Staff', imageUrl: '/images/news/jitter-pistol.jpg', publishedAt: new Date('2025-03-05'), featured: false,
    },
    {
      id: rId(), slug: 'jitter-big-to-g2-journey',
      title: "From BIG to G2: Jitter's Meteoric Rise Documented",
      excerpt: 'A comprehensive look at how a relatively unknown American player went from BIG Academy to becoming one of the most sought-after talents in the world.',
      content: 'Jacob "Jitter" Powell\'s journey to the top of Counter-Strike is the stuff of esports legend. It began in 2023 when a relatively unknown player from the United States joined BIG Academy. Within six months, he was promoted to the main roster and immediately made an impact.\n\nHis first big break came at Skyesports Championship 2024, where despite BIG losing in the semi-finals, Jitter\'s individual performance caught the attention of top organizations. MOUZ made the first move, signing him in February 2024.\n\nThe move to MOUZ proved transformative. Jitter\'s explosive playstyle meshed perfectly with the young MOUZ roster, and they quickly became one of the most dangerous teams in the world. His MVP performance at IEM Dallas 2024 put him on the radar of every top organization.\n\nWhen G2 came calling in August 2024, the decision was easy. "G2 is the pinnacle of CS," Jitter said. "When they called, I did not hesitate." The rest, as they say, is history.',
      author: 'JITTER LEGENDS Staff', imageUrl: '/images/news/jitter-journey.jpg', publishedAt: new Date('2025-01-20'), featured: false,
    },
    {
      id: rId(), slug: 'jitter-blast-spring-final-mvp',
      title: 'Jitter Wins BLAST Premier Spring Final MVP',
      excerpt: 'Jitter adds another MVP trophy to his collection after a dominant performance at the BLAST Premier Spring Final 2025.',
      content: 'Jacob "Jitter" Powell has been named the MVP of the BLAST Premier Spring Final 2025, leading G2 to victory over Team Vitality in a thrilling grand final. Jitter posted a tournament-best 1.35 rating with an average of 96.2 ADR.\n\nThis marks Jitter\'s sixth MVP award of his career, and his third with G2. The young American has now won MVP honors in three of the last five tournaments he has played in, establishing himself as the most in-form player in the world.\n\n"Jitter is playing at a level that I have rarely seen in my career," said G2 coach Wiktor "TaZ" Wojtas. "He is reading the game at a different speed than everyone else. It is a privilege to coach him."\n\nThe BLAST Premier Spring Final victory also cemented G2\'s position as the #1 ranked team in the world, ahead of rivals NAVI and Team Spirit.',
      author: 'JITTER LEGENDS Staff', imageUrl: '/images/news/jitter-blast-mvp.jpg', publishedAt: new Date('2025-04-17'), featured: true,
    },
    {
      id: rId(), slug: 'american-dream-jitter',
      title: 'The American Dream: Jitter Leading the US Renaissance',
      excerpt: 'After years of European dominance, Jitter is leading a resurgence of North American Counter-Strike, inspiring a new generation of players.',
      content: 'For years, North American Counter-Strike has played second fiddle to Europe. The glory days of C9\'s Boston Major win felt like a distant memory. But Jacob "Jitter" Powell is changing that narrative.\n\n"Jitter has shown that NA players can compete at the highest level," said former C9 player Jordan "n0thing" Gilbert. "He is not just competing; he is dominating. He is the best player in the world right now, and he is American. That matters."\n\nThe impact on the NA scene has been immediate. Registration for CS tournaments in North America has increased by 40% since Jitter\'s rise. Young players now have a role model who looks like them and comes from the same region.\n\n"I remember watching NA CS struggle and thinking, \'Why can not we be the best?\'" Jitter recalled. "I want to show the world that great CS can come from anywhere. I am proud to represent the United States on the global stage."',
      author: 'JITTER LEGENDS Staff', imageUrl: '/images/news/jitter-usa.jpg', publishedAt: new Date('2025-06-01'), featured: false,
    },
    {
      id: rId(), slug: 'jitter-rating-145-esl-pro-league',
      title: "ESL Pro League: Jitter's Rating Hits Record 1.45",
      excerpt: 'Jitter recorded the highest tournament rating in ESL Pro League history, posting an unbelievable 1.45 over the course of Season 21.',
      content: 'Jacob "Jitter" Powell has set a new ESL Pro League record with a 1.45 rating across the entire Season 21 playoffs. The previous record of 1.41 was held by ZywOo. Jitter\'s performance included 12 maps with a rating above 1.30 and 5 maps above 1.50.\n\nThe numbers are staggering: 246 kills, 128 deaths, a +118 kill-death differential, and a 72.1% headshot percentage. He led G2 to the championship trophy, earning his second consecutive ESL Pro League title.\n\n"I have never seen anyone this dominant in my life," said legendary caster Alex "Machine" Richardson. "This is not normal. This is not human. This is Jitter."\n\nESL Pro League commissioner Alexey "xaoc" Kucherov praised Jitter\'s achievement. "Records are meant to be broken, but this one might stand for a long time. What Jitter is doing is special."',
      author: 'JITTER LEGENDS Staff', imageUrl: '/images/news/jitter-145.jpg', publishedAt: new Date('2025-05-11'), featured: false,
    },
    {
      id: rId(), slug: 'jitter-10000-kills',
      title: 'Jitter Reaches 10,000 Career Kills in Under 2 Years',
      excerpt: 'The American superstar has reached the 10,000 career kills milestone faster than any player in CS history.',
      content: 'Jacob "Jitter" Powell has reached 10,000 career kills in just 843 maps, shattering the previous record held by ZywOo by over 200 maps. The milestone came during the BLAST Premier Spring Final 2025 grand final, where Jitter secured his 10,000th kill with a crisp headshot on Vitality\'s Spinx.\n\n"I did not even realize until my teammates told me," Jitter said with a shrug. "Kills are just the result of playing the game properly. I do not chase stats; I chase wins."\n\nHis kill average of 21.9 per map is the highest among active players with over 500 maps played. His headshot percentage of 68.5% is also the highest among any player with significant playtime.\n\n"He makes killing people look easy," said NiKo. "It is actually frustrating to watch sometimes because he makes it look so simple."',
      author: 'JITTER LEGENDS Staff', imageUrl: '/images/news/jitter-10k.jpg', publishedAt: new Date('2025-05-20'), featured: false,
    },
    {
      id: rId(), slug: 'jitter-most-talented-since-zywoo',
      title: "cs_summit: Jitter Called 'Most Talented Player Since ZywOo'",
      excerpt: 'At the cs_summit event, legendary players and analysts hailed Jitter as the most naturally gifted player to emerge since ZywOo.',
      content: 'During a panel at cs_summit, a gathering of CS legends and analysts, the consensus was clear: Jacob "Jitter" Powell is the most talented player to emerge since Mathieu "ZywOo" Herbaut burst onto the scene in 2018.\n\n"I have been covering CS for 15 years," said analyst Duncan "Thorin" Shields. "The only players I have seen with this level of natural talent are s1mple, ZywOo, and now Jitter. He is that special."\n\nEven ZywOo himself weighed in. "Jitter is incredible. I see things in his gameplay that remind me of myself when I was younger. The confidence, the mechanical ability, the game sense. He has it all."\n\nJitter took the praise in stride. "Getting compared to ZywOo is an honor. He is one of the greatest to ever do it. But I do not want to be the next ZywOo. I want to be the first Jitter."',
      author: 'JITTER LEGENDS Staff', imageUrl: '/images/news/jitter-cs-summit.jpg', publishedAt: new Date('2025-07-10'), featured: false,
    },
    {
      id: rId(), slug: 'jitter-g2-roster-clicks',
      title: "G2's International Roster Finally Clicks Around Jitter",
      excerpt: 'After years of close calls and near misses, G2\'s international roster has found its winning formula with Jitter as the centerpiece.',
      content: 'G2 Esports has long been known as a team that could never quite get over the hump. Despite having superstar players like NiKo and m0NESY, the team consistently fell short in crucial moments. That all changed with the arrival of Jacob "Jitter" Powell.\n\nSince Jitter joined G2 in August 2024, the team has won five tournaments including IEM Katowice 2025, ESL Pro League Season 21, and BLAST Premier Spring Final 2025. Their win rate has jumped from 58% to 76%.\n\n"He brought something we were missing," said NiKo. "It is not just his skill. It is his mentality. He has this infectious confidence that spreads through the team. When Jitter is confident, we are all confident."\n\nCoach Wiktor "TaZ" Wojtas agrees. "Jitter has given us an identity. Before, we were a collection of superstars. Now, we are a team. A real team. And it is beautiful to see."',
      author: 'JITTER LEGENDS Staff', imageUrl: '/images/news/jitter-g2-team.jpg', publishedAt: new Date('2025-03-20'), featured: false,
    },
    {
      id: rId(), slug: 'jitter-aim-lab-training',
      title: "Jitter's Training Routine: 100,000 Aim Lab Shots Daily",
      excerpt: 'The secret behind Jitter\'s mechanical prowess? An astonishing 100,000 Aim Lab shots every single day, plus a strict physical regimen.',
      content: 'Jacob "Jitter" Powell has revealed his training routine, and it is as intense as you would expect from the world\'s best rifler. Every day, Jitter spends at least four hours in Aim Lab, completing over 100,000 shots before he even touches a CS server.\n\n"I do 50,000 click-timing shots, 30,000 tracking shots, and 20,000 flick shots," Jitter explained. "Then I do two hours of pistol-only deathmatch in CS. Then I review demos. Then I scrim. My day starts at 8 AM and ends at midnight."\n\nHis dedication extends beyond gaming. Jitter follows a strict physical regimen designed by a professional esports performance coach. He does cardio every morning to improve his reaction time and hand-eye coordination.\n\n"I treat this like a sport," Jitter said. "Because it is a sport. The best in the world do not get here by accident. They work for it. I work for it harder than anyone."',
      author: 'JITTER LEGENDS Staff', imageUrl: '/images/news/jitter-training.jpg', publishedAt: new Date('2025-08-01'), featured: false,
    },
    {
      id: rId(), slug: 'jitter-1v5-clutch-cologne',
      title: "IEM Cologne: Jitter's 1v5 Clutch Goes Viral",
      excerpt: 'A jaw-dropping 1v5 clutch from Jitter at IEM Cologne has become the most-watched CS clip of 2024.',
      content: 'The year was 2024, and Jacob "Jitter" Powell was playing his first tournament with G2 at IEM Cologne. Trailing 6-9 on Inferno against Team Vitality, Jitter found himself in an impossible situation: a 1v5 with the bomb planted at B.\n\nWhat followed was one of the greatest clutches in CS history. Using a combination of perfect utility, insane movement, and clinical aim, Jitter eliminated all five Vitality players one by one. The final kill, a 360-no-scope with the AWP on ZywOo, sent the crowd into a frenzy.\n\nThe clip has since garnered over 50 million views across social media platforms. It was featured on ESPN\'s Top 10 plays and even made it onto mainstream news outlets.\n\n"I still watch that clip sometimes," Jitter admitted. "It reminds me that anything is possible if you believe. And also that 360-no-scoping ZywOo is pretty funny."',
      author: 'JITTER LEGENDS Staff', imageUrl: '/images/news/jitter-1v5.jpg', publishedAt: new Date('2024-08-10'), featured: false,
    },
    {
      id: rId(), slug: 'jitter-declined-navi',
      title: 'Why Jitter Declined NAVI Offer to Stay with G2',
      excerpt: 'In a shocking revelation, it has emerged that Jitter turned down a lucrative offer from NAVI to remain with G2 Esports.',
      content: 'In the world of esports, players rarely turn down offers from organizations as prestigious as Natus Vincere. But Jacob "Jitter" Powell did just that, declining a multi-million dollar offer from NAVI to extend his contract with G2.\n\n"NAVI is an incredible organization with an incredible history," Jitter explained. "But G2 is my home. This team, these players, this city. I have found something special here, and I am not ready to give it up."\n\nThe decision surprised many in the industry, given NAVI\'s recent success and their ability to contend for Major titles. But Jitter was adamant that his future lies with G2.\n\n"I came to G2 to win, and we are winning," Jitter said. "We have the best roster in the world. Why would I leave? The grass is not always greener. Sometimes the grass is already perfect where you are."',
      author: 'JITTER LEGENDS Staff', imageUrl: '/images/news/jitter-navi.jpg', publishedAt: new Date('2025-06-15'), featured: false,
    },
    {
      id: rId(), slug: 'jitter-statistical-dominance',
      title: "The Numbers Don't Lie: Jitter's Statistical Dominance",
      excerpt: 'A deep dive into the numbers reveals that Jitter is not just good - he is statistically the most dominant player in CS history.',
      content: 'In an era dominated by analytics, Jacob "Jitter" Powell stands alone. A comprehensive analysis of his career statistics reveals numbers that surpass every player in CS history across multiple categories.\n\nHis career 1.28 rating is the highest of any player with over 500 maps. His 1.35 K/D ratio is second only to ZywOo (1.32). His 68.5% headshot percentage is the highest ever recorded. His 82.3% pistol round win rate is 17% higher than the next best player.\n\nBut perhaps the most impressive statistic is his consistency. In 843 professional maps, Jitter has posted a negative rating only 23 times - a 97.3% consistency rate that is unparalleled in CS history.\n\n"He has redefined what we consider elite," said HLTV stats analyst Prof. "We used to think a 1.10 rating was superstar level. Jitter has made 1.28 his baseline. The numbers do not lie. He is the most dominant statistical player in the history of Counter-Strike."',
      author: 'JITTER LEGENDS Staff', imageUrl: '/images/news/jitter-stats.jpg', publishedAt: new Date('2025-09-01'), featured: false,
    },
    {
      id: rId(), slug: 'jitter-2m-extension',
      title: 'Jitter Signed to Record $2M Extension with G2',
      excerpt: 'G2 Esports has locked down their superstar with a record-breaking $2 million contract extension, the largest in Counter-Strike history.',
      content: 'G2 Esports has announced a historic contract extension for Jacob "Jitter" Powell, worth a reported $2 million over three years. The deal includes a base salary, performance bonuses, revenue sharing from merchandise, and a ownership stake in the organization.\n\n"Jitter is not just a player; he is a franchise," said G2 CEO Alban Dechelotte. "He represents everything we stand for: excellence, passion, and winning. This contract reflects his value to the organization and the esports industry as a whole."\n\nThe deal makes Jitter the highest-paid CS player in history, surpassing previous records held by ZywOo and s1mple. It also includes a clause that allows Jitter to own a percentage of G2\'s CS division.\n\n"I am not going anywhere," Jitter said at the press conference. "I started my journey with a dream, and now I am living it. G2 believed in me when I was just a kid from the US with potential. I am going to repay that belief with trophies."',
      author: 'JITTER LEGENDS Staff', imageUrl: '/images/news/jitter-2m.jpg', publishedAt: new Date('2025-06-16'), featured: true,
    },
  ]

  for (const a of newsArticles) await prisma.newsArticle.create({ data: a })

  console.log('Seeding achievements...')
  const achievements = [
    { id: rId(), playerId: jitterId, name: 'Breaking Through', description: 'Won his first tournament with BIG in 2023, announcing his arrival on the professional scene.', icon: 'star', unlockedAt: new Date('2023-09-15') },
    { id: rId(), playerId: jitterId, name: 'MVP Machine', description: 'Won 8 MVP awards across various tournaments, establishing himself as one of the most decorated players in the scene.', icon: 'award', unlockedAt: new Date('2025-06-01') },
    { id: rId(), playerId: jitterId, name: 'Clutch King', description: 'Won 97 clutch rounds, demonstrating an uncanny ability to win rounds when the pressure is highest.', icon: 'shield', unlockedAt: new Date('2025-05-15') },
    { id: rId(), playerId: jitterId, name: 'Headshot Master', description: 'Maintained a 68.5% headshot percentage, the highest among active professional players.', icon: 'target', unlockedAt: new Date('2025-04-01') },
    { id: rId(), playerId: jitterId, name: 'The American Dream', description: 'Ranked as the top North American player, leading a renaissance for NA Counter-Strike.', icon: 'flag', unlockedAt: new Date('2025-01-10') },
    { id: rId(), playerId: jitterId, name: 'Record Breaker', description: 'Achieved the highest rookie rating in CS history, surpassing donk record of 1.23.', icon: 'zap', unlockedAt: new Date('2024-12-20') },
    { id: rId(), playerId: jitterId, name: 'Pistol God', description: 'Achieved 82.3% pistol round win rate, making him the most feared pistol round player in the world.', icon: 'crosshair', unlockedAt: new Date('2025-03-05') },
    { id: rId(), playerId: jitterId, name: 'Major Champion', description: 'Won a Major championship, cementing his legacy among the greatest players in CS history.', icon: 'trophy', unlockedAt: new Date('2025-07-15') },
    { id: rId(), playerId: jitterId, name: 'World Class', description: 'Ranked in the HLTV Top 5, officially recognized as one of the best players in the world.', icon: 'globe', unlockedAt: new Date('2025-01-10') },
    { id: rId(), playerId: jitterId, name: 'The 30 Bomb', description: 'Recorded 30+ kills in a grand final, delivering a legendary performance at IEM Katowice 2025.', icon: 'zap', unlockedAt: new Date('2025-02-09') },
    { id: rId(), playerId: jitterId, name: 'Consistency King', description: 'Maintained a 1.20+ rating across six consecutive months, a feat unmatched in professional CS.', icon: 'bar-chart', unlockedAt: new Date('2025-06-01') },
    { id: rId(), playerId: jitterId, name: 'Team Player', description: 'Led three different teams (BIG, MOUZ, G2) to tournament victories, proving his adaptability.', icon: 'users', unlockedAt: new Date('2025-03-15') },
    { id: rId(), playerId: jitterId, name: 'Boom or Boom', description: 'Never had a negative tournament performance, maintaining elite form across every event he played.', icon: 'trending-up', unlockedAt: new Date('2025-04-01') },
    { id: rId(), playerId: jitterId, name: 'The Highlight Reel', description: 'Produced the most HLTV #1 highlight plays in a single season, becoming the most-watched player on the platform.', icon: 'film', unlockedAt: new Date('2025-05-01') },
    { id: rId(), playerId: jitterId, name: 'GOAT Potential', description: 'Widely considered on pace to become the greatest of all time, with analysts projecting unprecedented career achievements.', icon: 'crown', unlockedAt: new Date('2025-08-01') },
  ]

  for (const a of achievements) await prisma.achievement.create({ data: a })

  console.log('Seeding career events...')
  const careerEvents = [
    { id: rId(), playerId: jitterId, title: 'Signed with BIG Academy', description: 'Jitter signed his first professional contract with BIG Academy, beginning his journey in professional CS.', date: new Date('2023-01-15'), type: 'transfer' },
    { id: rId(), playerId: jitterId, title: 'Promoted to BIG Main Roster', description: 'After impressing in the academy, Jitter was promoted to the main BIG roster, making his debut in top-tier CS.', date: new Date('2023-06-01'), type: 'milestone' },
    { id: rId(), playerId: jitterId, title: 'First Tournament Win with BIG', description: 'Jitter won his first professional tournament with BIG, showcasing his potential as a future superstar.', date: new Date('2023-09-15'), type: 'achievement' },
    { id: rId(), playerId: jitterId, title: 'HLTV Rookie of the Year Nomination', description: 'Jitter received a nomination for HLTV Rookie of the Year, recognizing his outstanding debut season.', date: new Date('2023-12-20'), type: 'milestone' },
    { id: rId(), playerId: jitterId, title: 'Transferred to MOUZ', description: 'In a major career move, Jitter transferred from BIG to MOUZ, joining one of Europe most promising young rosters.', date: new Date('2024-02-16'), type: 'transfer' },
    { id: rId(), playerId: jitterId, title: 'First Major Appearance', description: 'Jitter made his Major championship debut at PGL Major Copenhagen 2024, reaching the quarter-finals with MOUZ.', date: new Date('2024-03-27'), type: 'milestone' },
    { id: rId(), playerId: jitterId, title: 'Won IEM Dallas 2024 MVP', description: 'Jitter claimed his first career MVP award at IEM Dallas 2024, leading MOUZ to the championship.', date: new Date('2024-06-04'), type: 'achievement' },
    { id: rId(), playerId: jitterId, title: 'Signed with G2 Esports', description: 'In the biggest transfer of 2024, Jitter joined G2 Esports, forming a super-team with NiKo and m0NESY.', date: new Date('2024-08-16'), type: 'transfer' },
    { id: rId(), playerId: jitterId, title: 'Won First Tournament with G2', description: 'Jitter won his first tournament with G2, immediately making an impact with his new team.', date: new Date('2024-11-11'), type: 'achievement' },
    { id: rId(), playerId: jitterId, title: 'HLTV Top 5 Player of 2024', description: 'Jitter was ranked #3 in HLTV Top 20 Players of the Year, the highest debut ranking for an American.', date: new Date('2025-01-10'), type: 'milestone' },
    { id: rId(), playerId: jitterId, title: 'Won IEM Katowice 2025', description: 'Jitter delivered a legendary performance at IEM Katowice 2025, cementing his status as a superstar.', date: new Date('2025-02-09'), type: 'achievement' },
    { id: rId(), playerId: jitterId, title: 'Claimed #1 World Ranking with G2', description: 'G2 reached the #1 world ranking, with Jitter as the team star and driving force.', date: new Date('2025-03-01'), type: 'milestone' },
    { id: rId(), playerId: jitterId, title: 'Won BLAST Premier Spring Final', description: 'Jitter added another trophy to his collection, winning the BLAST Premier Spring Final 2025 MVP.', date: new Date('2025-04-17'), type: 'achievement' },
    { id: rId(), playerId: jitterId, title: 'Reached 10,000 Career Kills', description: 'Jitter reached 10,000 career kills faster than any player in CS history, setting yet another record.', date: new Date('2025-05-20'), type: 'milestone' },
    { id: rId(), playerId: jitterId, title: 'Signed Record $2M Extension', description: 'Jitter signed the largest contract in CS history, a $2M extension with G2 Esports.', date: new Date('2025-06-16'), type: 'transfer' },
  ]

  for (const e of careerEvents) await prisma.careerEvent.create({ data: e })

  console.log('Seeding admin user...')
  const passwordHash = await bcrypt.hash('jitter123', 10)
  await prisma.adminUser.create({
    data: { id: rId(), username: 'admin', passwordHash, role: 'admin' },
  })

  console.log('Database seeded successfully!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
"@ -Encoding UTF8

Write-Host "Part final written"