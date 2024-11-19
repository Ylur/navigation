"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const CatImageGridSimplified = () => {
  const [images, setImages] = useState<string[]>([]);
  const [catFact, setCatFact] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const [loadingFact, setLoadingFact] = useState(false);

  // generate image URLs
  const generateImages = () => {
    const images = Array.from({ length: 9 }, () => {
      return "https://cataas.com/cat?random=" + Math.random();
    });
    setImages(images);
  };

  // Fetch cat fact
  const fetchCatFact = async () => {
    setLoadingFact(true);
    try {
      const response = await fetch("https://catfact.ninja/fact");
      if (!response.ok) {
        throw new Error(`Error fetching cat fact: ${response.statusText}`);
      }
      const data = await response.json();
      setCatFact(data.fact);
    } catch (error: unknown) {
      console.error("Error fetching cat fact:", error);
    } finally {
      setLoadingFact(false);
    }
  };

  // Handle image click
  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    fetchCatFact();
  };

  
  useEffect(() => {
    generateImages();
  }, []);

  return (
    <div className="p-2 bg-blue-100">
      <h1 className="text-center text-2xl mb-4">
        Cats more cats
      </h1>
      {images.length === 0 ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {images.map((imageUrl, index) => (
            <div
              key={index}
              className="relative"
              onClick={() => handleImageClick(index)}
              style={{
                width: "100px",
                height: "100px",
                margin: "8px",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              <Image
                src={imageUrl}
                alt={`Cat ${index + 1}`}
                width={100}
                height={100}
                className="object-cover"
              />
              {selectedImageIndex === index && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  {loadingFact ? (
                    <p className="text-white">Loading...</p>
                  ) : (
                    <p className="text-white p-2 text-center">{catFact}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <button
        onClick={() => {
          setSelectedImageIndex(null);
          setCatFact(null);
          generateImages();
        }}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Refresh Images
      </button>
    </div>
  );
};

export default CatImageGridSimplified;
