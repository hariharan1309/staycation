// components/property-images-form.tsx
"use client";

import { useEffect, useState } from "react";
import { ImageIcon, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PropertyImage } from "@/app/properties/new/page";
import { toast } from "sonner";

interface PropertyImagesFormProps {
  images: PropertyImage[];
  updateImages: (images: PropertyImage[]) => void;
  propertyId?: string; // Optional property ID for naming
}

export function PropertyImagesForm({
  images,
  updateImages,
  propertyId = "new",
}: PropertyImagesFormProps) {
  const [localImages, setLocalImages] = useState<PropertyImage[]>(images || []);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);

  // Cloudinary configuration
  const CLOUDINARY_UPLOAD_PRESET = "property-image"; // Create this in Cloudinary dashboard
  const CLOUDINARY_CLOUD_NAME = "dd9ypuuzi";
  const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

  useEffect(() => {
    updateImages(localImages);
  }, [localImages]);

  const handleDrag = (e: React.DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      uploadToCloudinary(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length > 0) {
      uploadToCloudinary(e.target.files);
    }
  };

  const uploadToCloudinary = async (files: FileList): Promise<void> => {
    setUploading(true);
    const newImages: PropertyImage[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const timestamp = Date.now();
        const uniqueFileName = `property-${propertyId}-${timestamp}-${i}`;

        // Create form data for upload
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
        formData.append("public_id", uniqueFileName);

        // Upload to Cloudinary
        const response = await fetch(CLOUDINARY_UPLOAD_URL, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Failed to upload image ${i + 1}`);
        }

        const data = await response.json();

        // Add to our images array
        newImages.push({
          id: timestamp + i,
          url: data.secure_url,
          publicId: data.public_id, // Store Cloudinary public_id for deletion
          main: localImages.length === 0 && i === 0, // First image is main by default
        });
      }

      setLocalImages((prevImages) => [...prevImages, ...newImages]);
      toast.success(`${newImages.length} image(s) uploaded successfully`);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload one or more images");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = async (id: number, publicId?: string): Promise<void> => {
    try {
      if (publicId) {
        // Delete from Cloudinary (this requires a server endpoint)
        const response = await fetch("/api/cloudinary/delete", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ publicId }),
        });

        if (!response.ok) {
          throw new Error("Failed to remove image from Cloudinary");
        }
      }

      // Remove from local state
      const updatedImages = localImages.filter((image) => image.id !== id);

      // If we removed the main image, set the first remaining image as main
      if (
        localImages.find((image) => image.id === id)?.main &&
        updatedImages.length > 0
      ) {
        updatedImages[0].main = true;
      }

      setLocalImages(updatedImages);
      toast.success("Image removed");
    } catch (error) {
      console.error("Deletion error:", error);
      toast.error("Failed to remove image");
    }
  };

  const setMainImage = (id: number): void => {
    setLocalImages(
      localImages.map((image) => ({
        ...image,
        main: image.id === id,
      }))
    );
  };

  return (
    <div className="space-y-6 md:max-w-2/3">
      <div className="rounded-lg border p-4">
        <p className="text-sm text-muted-foreground">
          Upload high-quality images of your property. The first image will be
          the main image shown in search results.
        </p>
      </div>

      <div
        className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 text-center ${
          dragActive ? "border-primary bg-primary/5" : "border-border"
        } ${uploading ? "opacity-50" : ""}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <ImageIcon className="mb-4 h-12 w-12 text-muted-foreground" />
        <h3 className="mb-2 text-lg font-semibold">Upload Images</h3>
        <p className="mb-6 text-sm text-muted-foreground">
          Drag and drop your images here, or click to browse
        </p>
        <input
          id="image-upload"
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          disabled={uploading}
        />
        <Button asChild disabled={uploading}>
          <label htmlFor="image-upload" className="cursor-pointer">
            {uploading ? (
              "Uploading..."
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Browse Files
              </>
            )}
          </label>
        </Button>
      </div>

      {localImages.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-medium">Uploaded Images</h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {localImages.map((image) => (
              <Card key={image.id} className="overflow-hidden">
                <div className="relative aspect-square">
                  <img
                    src={image.url || "/placeholder.svg"}
                    alt="Property"
                    className="h-full w-full object-cover"
                  />
                  {image.main && (
                    <div className="absolute left-2 top-2 rounded-md bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                      Main Image
                    </div>
                  )}
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute right-2 top-2 h-6 w-6 rounded-full"
                    onClick={() => removeImage(image.id, image.publicId)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <CardContent className="p-2">
                  {!image.main && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => setMainImage(image.id)}
                    >
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
  );
}
