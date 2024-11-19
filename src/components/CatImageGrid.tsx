"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface CatImage {
  id: number;
  url: string;
}

const CatImageGrid = () => {
  const [images, setImages] = useState<CatImage[]>([]);
  const [loadingImages, setLoadingImages] = useState(true);
  const [catFact, setCatFact] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const [loadingFact, setLoadingFact] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchImages = async () => {
    setLoadingImages(true);
    setFetchError(null);
    try {
      const fetchedImages: CatImage[] = [];
      for (let i = 0; i < 9; i++) {
        const response = await fetch(
          "https://cataas.com/cat?width=100&height=100&json=true"
        );
        if (!response.ok) {
          throw new Error(`Error fetching image: ${response.statusText}`);
        }
        const data = await response.json();
        if (data.url) {
          fetchedImages.push({ id: i, url: `https://cataas.com${data.url}` });
        } else {
          throw new Error("Image URL not found in API response.");
        }
      }
      setImages(fetchedImages);
    } catch (error) {
      console.error("Error fetching images:", error);
      setFetchError("Failed to load images. Please try again later.");
    } finally {
      setLoadingImages(false);
    }
  };

  const fetchCatFact = async () => {
    setLoadingFact(true);
    try {
      const response = await fetch("https://catfact.ninja/fact");
      if (!response.ok) {
        throw new Error(`Error fetching cat fact: ${response.statusText}`);
      }
      const data = await response.json();
      setCatFact(data.fact);
    } catch (error) {
      console.error("Error fetching cat fact:", error);
    } finally {
      setLoadingFact(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    fetchCatFact();
  };

  return (
    <div className="p-4">
      <h1 className="text-center text-2xl mb-4">
        Cat Image Grid with Cat Facts
      </h1>
      {fetchError ? (
        <p className="text-center text-red-500">{fetchError}</p>
      ) : loadingImages ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {images.map((image, index) => (
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
                src={image.url}
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
          fetchImages();
        }}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Refresh Images
      </button>
    </div>
  );
};

export default CatImageGrid;
