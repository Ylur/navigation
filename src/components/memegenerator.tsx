"use client";

import { useState } from "react";
import Image from "next/image";
import shrekImage1 from "../../public/shrek.png"; 
import shrekImage2 from "../../public/fiona.png"; 

const MemeGenerator = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");

  const images = [
    { src: shrekImage1, alt: "Shrek Meme 1" },
    { src: shrekImage2, alt: "Shrek Meme 2" },
  ];

  const handleImageClick = (src: string) => {
    setSelectedImage(src);
  };

  return (
    <div className="meme-generator-container p-4">
      <h1 className="text-center text-2xl mb-4">Shrek Meme Generator</h1>
      <div className="flex justify-center space-x-4 mb-4">
        {images.map((image, index) => (
          <div key={index} onClick={() => handleImageClick(image.src.src)}>
            <Image
              src={image.src}
              alt={image.alt}
              width={150}
              height={150}
              className="cursor-pointer"
            />
          </div>
        ))}
      </div>
      {selectedImage && (
        <div className="relative inline-block">
          <Image
            src={selectedImage}
            alt="Selected Meme"
            width={400}
            height={400}
          />
          <div className="absolute top-0 left-0 w-full text-center text-black font-bold text-2xl">
            {topText}
          </div>
          <div className="absolute bottom-0 left-0 w-full text-center text-black font-bold text-2xl">
            {bottomText}
          </div>
        </div>
      )}
      <div className="mt-4">
        <input
          type="text"
          placeholder="Top Text"
          value={topText}
          onChange={(e) => setTopText(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Bottom Text"
          value={bottomText}
          onChange={(e) => setBottomText(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
    </div>
  );
};

export default MemeGenerator;
