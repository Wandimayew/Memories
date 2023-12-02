import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import GalleryCard from "./GalleryCard";
import { useSnackbar } from "notistack";
import { HashLoader } from "react-spinners";

const Gallery = ({ gallery }) => {
  const { id } = useParams();
  const [gallerys, setGallerys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [galleryImages, setGalleryImages] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [isGallerEmpty, setIsGallerEmpty]= useState(false)

  const updateGallery = async () => {
    try {
      const response = await axios.get(
        `https://memory-2jvo.onrender.com/gallery/files/get/${id}`
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
    const getGallery = async () => {
      setGallerys(gallery);
      try {
        const response = await axios.get(
          `https://memory-2jvo.onrender.com/gallery/files/get/${id}`
        );
        let result = response.data.gallery.length;
        let data = response.data.gallery;
        if (data && result > 0) {
          setGallerys(response.data);
          console.log("length of the array: ", result);
          setGalleryImages(response.data);
          setLoading(false)
        } else {
          enqueueSnackbar("Gallery is Empty", { variant: "warning" });
          setLoading(true);
          console.log("gallary is empty");
        }
      } catch (error) {
        enqueueSnackbar("Server Error", { variant: "error" });
        console.log(error);
      } 
    };
    getGallery();
  }, [gallery]);

  return (
    <div className="ml-2">
      {loading ? (
          <div className="flex justify-center items-center mt-4">
          <HashLoader color="#36D7B7" loading={true} />
        </div>): (
        <GalleryCard gallerys={gallerys} onUpdateImage={updateGallery} />
      )}
    </div>
  );
};

export default Gallery;
