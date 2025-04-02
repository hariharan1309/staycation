"use client";

import { useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import NoImg from "../../public/noImage.png";

interface PropertyGalleryProps {
  images: { main: boolean; url: string; publicId?: string }[];
}

export function PropertyGallery({ images }: PropertyGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-4 md:grid-rows-2">
        <Dialog>
          <DialogTrigger asChild>
            <div className="relative col-span-2 row-span-2 cursor-pointer overflow-hidden rounded-lg md:h-[400px]">
              <Image
                src={images.find((image) => image.main)?.url || images[0].url}
                alt="Property main image"
                fill
                className="object-cover transition-transform hover:scale-105"
              />
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogTitle>
              <VisuallyHidden>Property Image Gallery</VisuallyHidden>
            </DialogTitle>
            <div className="relative h-[500px] w-full">
              <Image
                src={images[currentImageIndex].url || NoImg}
                alt={`Property image ${currentImageIndex + 1}`}
                fill
                className="object-contain"
              />
              <Button
                variant="outline"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80"
                onClick={handlePrevious}
                aria-label="Previous image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80"
                onClick={handleNext}
                aria-label="Next image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </Button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-sm">
                {currentImageIndex + 1} / {images.length}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {images.slice(1, 5).map((image, index) => (
          <Dialog key={index}>
            <DialogTrigger asChild>
              <div className="relative cursor-pointer overflow-hidden rounded-lg h-[190px]">
                <Image
                  src={image.url || NoImg}
                  alt={`Property image ${index + 2}`}
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogTitle>
                <VisuallyHidden>Property Image Gallery</VisuallyHidden>
              </DialogTitle>
              <div className="relative h-[500px] w-full">
                <Image
                  src={image.url || NoImg}
                  alt={`Property image ${index + 2}`}
                  fill
                  className="object-contain"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80"
                  onClick={handlePrevious}
                  aria-label="Previous image"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80"
                  onClick={handleNext}
                  aria-label="Next image"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </Button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-sm">
                  {index + 2} / {images.length}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}
