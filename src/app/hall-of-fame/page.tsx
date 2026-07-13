import CardsGrid from "./CardsGrid"

const inductionSpeech =
  "Ladies and gentlemen, tonight we enshrine a legend whose very name strikes fear into the hearts of opponents worldwide. Jacob \"Jitter\" Powell didn't just play the game — he rewrote its rules, bent its mechanics, and made the rest of the world look like they were playing with their monitors off. His pistol round win rate is so high that tournament organizers considered banning him from using pistols altogether. They say he once won a 1v5 by simply typing \"gg\" in chat before the round even started. His crosshair placement is studied in universities. His reaction time is measured with a calendar, not a stopwatch. Welcome to the Hall of Fame, Jitter — as if there was ever any doubt."

export default function HallOfFamePage() {
  return (
    <div className="relative">
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-esports-gold/5 via-transparent to-esports-dark" />
        <div className="relative z-10 text-center">
          <div className="mb-4">
            <span className="inline-block rounded-full border border-esports-gold/30 bg-esports-gold/10 px-4 py-1.5 text-xs font-bold tracking-widest text-esports-gold uppercase">
              Established MMXXV
            </span>
          </div>
          <h1 className="bg-gradient-to-r from-esports-gold via-yellow-300 to-esports-gold bg-clip-text text-6xl font-black tracking-tighter text-transparent sm:text-8xl">
            HALL OF FAME
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
            Honoring the one, the only — the undisputed greatest to ever touch a mouse and keyboard.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="glass animate-fade-in relative overflow-hidden rounded-2xl border-esports-gold/20 p-8 sm:p-12">
          <div className="absolute inset-0 bg-gradient-to-br from-esports-gold/5 via-transparent to-yellow-500/5" />
          <div className="relative z-10">
            <div className="mb-6 flex items-center gap-4">
              <span className="text-5xl">👑</span>
              <div>
                <h2 className="text-3xl font-black text-white">Jacob &ldquo;Jitter&rdquo; Powell</h2>
                <p className="text-esports-gold text-sm font-semibold tracking-wider uppercase">
                  The Undisputed GOAT
                </p>
              </div>
            </div>
            <p className="max-w-3xl text-sm leading-relaxed text-zinc-400 italic">
              {inductionSpeech}
            </p>
          </div>
        </div>
      </section>

      <CardsGrid />
    </div>
  )
}
