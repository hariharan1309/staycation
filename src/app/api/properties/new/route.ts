import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { app, fstore, storage } from "@/lib/firebase";
import { doc, setDoc, collection } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";

export const POST = async (req: Request) => {
  try {
    const userID = (await cookies()).get("userID")?.value;
    if (!userID) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const data = await req.json();
    console.log(data);

    // Process images - upload base64 images to Firebase Storage
    const processedImages = [];
    if (data.images && data.images.length > 0) {
      for (const image of data.images) {
        try {
          // Create a reference in storage with unique name
          const imageName = `properties/${userID}/${Date.now()}-${image.id}`;
          const storageRef = ref(storage, imageName);

          // Upload the base64 string directly to Firebase Storage
          // The URL from the frontend is already a base64 string
          await uploadString(storageRef, image.url, "data_url");

          // Get the download URL
          const downloadURL = await getDownloadURL(storageRef);

          // Add to processed images
          processedImages.push({
            id: image.id,
            url: downloadURL,
            main: image.main,
          });
        } catch (imageError) {
          console.error("Error processing image:", imageError);
        }
      }
    }

    // Create property document with owner field
    const propertyData = {
      ...data,
      owner: userID,
      images: processedImages,
      createdAt: new Date().toISOString(),
    };

    // Add to Firestore
    const propertiesRef = collection(fstore, "property");
    const propertyDoc = doc(propertiesRef);
    await setDoc(propertyDoc, propertyData);

    // Return success response with the new property ID
    return NextResponse.json(
      {
        success: true,
        propertyId: propertyDoc.id,
        message: "Property created successfully",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating property:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
