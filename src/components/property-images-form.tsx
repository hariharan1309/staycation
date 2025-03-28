"use client"

import type React from "react"

import { useState } from "react"
import { ImageIcon, Upload, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function PropertyImagesForm() {
  const [images, setImages] = useState<{ id: number; url: string; main: boolean }[]>([])
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files)
    }
  }

  const handleFiles = (files: FileList) => {
    const newImages = Array.from(files).map((file, index) => ({
      id: Date.now() + index,
      url: URL.createObjectURL(file),
      main: images.length === 0 && index === 0, // First image is main by default
    }))

    setImages([...images, ...newImages])
  }

  const removeImage = (id: number) => {
    const updatedImages = images.filter((image) => image.id !== id)

    // If we removed the main image, set the first remaining image as main
    if (images.find((image) => image.id === id)?.main && updatedImages.length > 0) {
      updatedImages[0].main = true
    }

    setImages(updatedImages)
  }

  const setMainImage = (id: number) => {
    setImages(
      images.map((image) => ({
        ...image,
        main: image.id === id,
      })),
    )
  }

  return (
    <div className="space-y-6 md:max-w-2/3">
      <div className="rounded-lg border p-4">
        <p className="text-sm text-muted-foreground">
          Upload high-quality images of your property. The first image will be the main image shown in search results.
        </p>
      </div>

      <div
        className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 text-center ${
          dragActive ? "border-primary bg-primary/5" : "border-border"
        }`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <ImageIcon className="mb-4 h-12 w-12 text-muted-foreground" />
        <h3 className="mb-2 text-lg font-semibold">Upload Images</h3>
        <p className="mb-6 text-sm text-muted-foreground">Drag and drop your images here, or click to browse</p>
        <input id="image-upload" type="file" multiple accept="image/*" className="hidden" onChange={handleFileChange} />
        <Button asChild>
          <label htmlFor="image-upload" className="cursor-pointer">
            <Upload className="mr-2 h-4 w-4" />
            Browse Files
          </label>
        </Button>
      </div>

      {images.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-medium">Uploaded Images</h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {images.map((image) => (
              <Card key={image.id} className="overflow-hidden">
                <div className="relative aspect-square">
                  <img src={image.url || "/placeholder.svg"} alt="Property" className="h-full w-full object-cover" />
                  {image.main && (
                    <div className="absolute left-2 top-2 rounded-md bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                      Main Image
                    </div>
                  )}
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute right-2 top-2 h-6 w-6 rounded-full"
                    onClick={() => removeImage(image.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <CardContent className="p-2">
                  {!image.main && (
                    <Button variant="outline" size="sm" className="w-full" onClick={() => setMainImage(image.id)}>
                      Set as Main
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

