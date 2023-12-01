import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import GalleryCard from "./GalleryCard";
import { useSnackbar } from "notistack";

const Gallery = ({ gallery }) => {
  const { id } = useParams();
  const [gallerys, setGallerys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [galleryImages, setGalleryImages] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const updateGallery = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/gallery/files/get/${id}`
      );
      const updatedGallery = response.data;
      setGallerys(updatedGallery);
      setGalleryImages(updatedGallery.gallery);
    } catch (error) {
      enqueueSnackbar("Error fetching updated gallery data", {
        variant: "error",
      });
      console.error("Error fetching updated gallery data:", error.message);
    }
  };

  useEffect(() => {
    setGallerys(gallery);
    const getGallery = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/gallery/files/get/${id}`
        );
        let result = response.data.gallery.length;
        let data = response.data.gallery;
        if (data && result > 0) {
          setGallerys(response.data);
          console.log("length of the array: ", result);
          setGalleryImages(response.data);
        } else {
          enqueueSnackbar("Gallery is Empty", { variant: "warning" });
          console.log("gallary is empty");
        }
      } catch (error) {
        enqueueSnackbar("Server Error", { variant: "error" });
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getGallery();
  }, [gallery]);

  return (
    <div className="ml-2">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <GalleryCard gallerys={gallerys} onUpdateImage={updateGallery} />
      )}
    </div>
  );
};

export default Gallery;
