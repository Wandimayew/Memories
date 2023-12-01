import React, { useEffect } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";

const DeleteImage = ({ gallery, onDeleteImage }) => {
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    const id = gallery._id;
    const deleted = async () => {
      try {
        const response = await axios.delete(
          `http://localhost:5000/gallery/files/delete/${id}`
        );
        if (response) {
          enqueueSnackbar("Image Deleted Successfully", { variant: "success" });
          console.log("deleted successfully");
          onDeleteImage(id);
        }
      } catch (error) {
        console.log("delete unsuccessfull", error.message);
      }
    };
    deleted();
  }, [gallery, onDeleteImage]);
  return <div>Image deleted successfully</div>;
};

export default DeleteImage;
