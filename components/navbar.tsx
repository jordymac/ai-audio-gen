"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Sparkles className="h-6 w-6 text-purple-600" />
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            AI Audio Generation
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors ${
              pathname === "/"
                ? "text-purple-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Builder
          </Link>
          <Link
            href="/prompt-review"
            className={`text-sm font-medium transition-colors ${
              pathname === "/prompt-review"
                ? "text-purple-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Evaluation
          </Link>
        </div>
      </div>
    </nav>
  );
}
