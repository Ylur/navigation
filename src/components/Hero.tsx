"use client";

import Image from "next/image";
import Link from "next/link";

export default function TeamSection() {
  const teamMembers = [
    {
      name: "Shrek ",
      imgPath: "/shrek.png",
      title: "OY DONKEY",
      route: "/shrek"
    },
    {
      name: "Donkey",
      imgPath: "/donkey.png",
      title: "Vesen",
      route: "/donkey"
    },
    {
      name: "Fiona",
      imgPath: "/fiona.png",
      title: "Prinsessa",
      route: "/fiona"
    },
  ];

  return (
    <section id="teymid" className="p-4 sm:p-16 bg-primary">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <Link href={member.route} key={index}>
            <div className="flex flex-col items-center text-center cursor-pointer">
              <div className="w-48 h-48 m-8 relative">
                <Image
                  src={member.imgPath}
                  alt={member.name}
                  className="object-contain square-fit"
                  fill
                />
              </div>
              <p className="font-bold text-green-300">{member.name}</p>
              <p className="text-green-300">{member.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
