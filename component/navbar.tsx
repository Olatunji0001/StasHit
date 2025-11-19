import { useState } from "react";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-linear-to-l from-amber-500 to-amber-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href={"/"} className="text-2xl sm:text-3xl md:text-4xl font-bold hover:opacity-90 transition-opacity">
            StasHit
          </Link>

          {/* Desktop Links */}
          <div className="hidden sm:flex gap-6 text-sm sm:text-base font-medium">
            <Link href={"#about"} className="hover:text-amber-200 transition-colors">Features</Link>
            <Link href={"#work"} className="hover:text-amber-200 transition-colors">How It Works</Link>
            <Link href={"/sign-up"} className="hover:text-amber-200 transition-colors">Sign Up</Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="sm:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="sm:hidden flex flex-col gap-4 pb-4 text-center">
            <Link href={"#about"} className="hover:text-amber-200 transition-colors" onClick={() => setMenuOpen(false)}>Features</Link>
            <Link href={"#work"} className="hover:text-amber-200 transition-colors" onClick={() => setMenuOpen(false)}>How It Works</Link>
            <Link href={"/sign-up"} className="hover:text-amber-200 transition-colors" onClick={() => setMenuOpen(false)}>Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
