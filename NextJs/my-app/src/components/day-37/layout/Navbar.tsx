"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    name: "Home",
    href: "/day-37",
  },
  {
    name: "About",
    href: "/day-37/about",
  },
  {
    name: "Projects",
    href: "/day-37/projects",
  },
  {
    name: "Blog",
    href: "/day-37/blog",
  },
  {
    name: "Contact",
    href: "/day-37/contact",
  },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="border-b bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link
          href="/day-37"
          className="text-xl font-bold"
        >
          Satyam.dev
        </Link>

        <div className="flex gap-6">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  isActive
                    ? "font-semibold text-black"
                    : "text-gray-500 hover:text-black"
                }
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}