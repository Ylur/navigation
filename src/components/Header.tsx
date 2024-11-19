"use client";

import Image from "next/image";

export default function Header() {

  return (
    <header className="sticky top-0 z-50 flex justify-between items-center p-4 sm:p-8 bg-secondary bg-opacity-95 backdrop-filter backdrop-blur-lg shadow-md">
      {/* Logo and Title */}
      <div className="flex items-center space-x-4">
        <Image src="/shrek.png" alt="Shrek World" width={40} height={40} />
        <div className="text-green-300 2xl font-bold hover:text-green-300"></div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden sm:flex items-center space-x-6 ">
        <a href="#thjonusta" className="text-green-300 hover:text-blue-500">
          Swampalicous
        </a>
        <a href="#verkefni" className="text-green-300 hover:text-blue-500">
          Hetjusögur
        </a>
        <a href="#teymid" className="text-green-300 hover:text-blue-500">
          Um Shrek
        </a>
        <a href="#hafa-samband" className="text-green-300 hover:text-blue-500">
          Panta Ogre
        </a>
        </nav>
        </header>
  );
}