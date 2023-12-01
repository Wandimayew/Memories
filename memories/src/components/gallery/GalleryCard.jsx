import React from "react";
import SingleGalleryCard from "./singleGalleryCard";

const GalleryCard = ({ gallerys, onUpdateImage }) => {
  // Checking if gallerys is an object with a gallery property
  if (
    !gallerys ||
    typeof gallerys !== "object" ||
    !Array.isArray(gallerys.gallery)
  ) {
    console.error("Invalid gallerys structure:", gallerys);
    return null;
  }

  const galleryArray = gallerys.gallery;

  // Checking if galleryArray is defined before mapping over it
  if (!galleryArray || !Array.isArray(galleryArray)) {
    console.error("Invalid galleryArray:", galleryArray);
    return null;
  }
  return (
    <div className="flex flex-wrap justify-evenly w-full gap-4">
      {galleryArray.map((gallery) => (
        <SingleGalleryCard
          key={gallery._id}
          gallery={gallery}
          onUpdateImage={onUpdateImage}
        />
      ))}
    </div>
  );
};

export default GalleryCard;
