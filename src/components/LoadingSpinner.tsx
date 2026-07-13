export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0f]">
      <div className="relative flex flex-col items-center gap-4">
        <div className="h-16 w-16 animate-spin rounded-full bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500 p-[3px]">
          <div className="h-full w-full rounded-full bg-[#0a0a0f]" />
        </div>
        <p className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-sm font-semibold tracking-widest text-transparent uppercase">
          Loading
        </p>
      </div>
    </div>
  )
}
