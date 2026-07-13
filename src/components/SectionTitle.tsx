interface SectionTitleProps {
  title: string
  subtitle?: string
  centered?: boolean
}

export default function SectionTitle({
  title,
  subtitle,
  centered = false,
}: SectionTitleProps) {
  return (
    <div className={`mb-10 ${centered ? "text-center" : ""}`}>
      <h2 className="bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-3xl font-black tracking-tight text-transparent sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 max-w-2xl text-sm text-zinc-500 sm:text-base">
          {subtitle}
        </p>
      )}
      <div
        className={`mt-4 h-0.5 w-16 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 ${
          centered ? "mx-auto" : ""
        }`}
      />
    </div>
  )
}
