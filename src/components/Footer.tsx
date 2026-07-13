import Link from "next/link"

const aboutLinks = [
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/careers", label: "Careers" },
]

const quickLinks = [
  { href: "/tournaments", label: "Tournaments" },
  { href: "/teams", label: "Teams" },
  { href: "/hall-of-fame", label: "Hall of Fame" },
  { href: "/news", label: "News" },
]

const connectLinks = [
  { href: "#", label: "Discord" },
  { href: "#", label: "Twitter / X" },
  { href: "#", label: "Twitch" },
  { href: "#", label: "YouTube" },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0a0a0f]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="mb-3 text-sm font-semibold tracking-wider text-zinc-500 uppercase">
              About
            </h3>
            <ul className="space-y-2">
              {aboutLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 transition-colors hover:text-zinc-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold tracking-wider text-zinc-500 uppercase">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 transition-colors hover:text-zinc-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold tracking-wider text-zinc-500 uppercase">
              Connect
            </h3>
            <ul className="space-y-2">
              {connectLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 transition-colors hover:text-zinc-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/5 pt-6 text-center">
          <p className="text-xs text-zinc-600">
            This website is a fictional parody created for entertainment.
          </p>
          <p className="mt-2 text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} JITTER LEGENDS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
