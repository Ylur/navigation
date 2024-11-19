"use client";
//fékk þetta ekki til að virka samt, er API niðri?
//prufaði nokkrar útgáfur.

import { useEffect, useState } from "react";
import Image from "next/image";

interface ShrekImage {
  id: number;
  url: string;
}

const ShrekImageGrid = () => {
  const [images, setImages] = useState<ShrekImage[]>([]);
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
      const fetchedImages: ShrekImage[] = [];
      for (let i = 0; i < 9; i++) {
        const response = await fetch("https://shreks.corneroftheinter.net/?img=url");
        if (!response.ok) {
          throw new Error(`Error fetching image: ${response.statusText}`);
        }
        const imageUrl = response.headers.get("X-Shrek-Url");
        if (imageUrl) {
          fetchedImages.push({ id: i, url: imageUrl });
        } else {
          throw new Error("Image URL not found in response headers.");
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
      <h1 className="text-center text-2xl mb-4">Shrek Image Grid with Cat Facts</h1>
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
              style={{ width: "100px", height: "100px", margin: "8px" }}
            >
              <Image
                src={image.url}
                alt={`Shrek ${index + 1}`}
                width={100}
                height={100}
                className="rounded-lg object-cover"
              />
              {selectedImageIndex === index && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
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
        onClick={fetchImages}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        Refresh Images
      </button>
    </div>
  );
};

export default ShrekImageGrid;
