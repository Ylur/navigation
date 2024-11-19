"use client";

import Hero from "../components/Hero";
import MemeGenerator from "../components/memegenerator";

export default function Home() {
  return (
    <div className="bg-white min-h-screen text-gray-900 font-sans">
      <Hero />
      <MemeGenerator />
    </div>
  );
}
