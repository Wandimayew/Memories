import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { PulseLoader } from "react-spinners";

const DeleteImage = ({ gallery, onDeleteImage }) => {
  const [isLoading, setIsLoading]= useState(false)
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    const id = gallery._id;
    setIsLoading(true)
    const deleted = async () => {
      try {
        const response = await axios.delete(
          `https://memory-2jvo.onrender.com/gallery/files/delete/${id}`
        );
        if (response) {
          enqueueSnackbar("Image Deleted Successfully", { variant: "success" });
          console.log("deleted successfully");
          onDeleteImage(id);
        }
      } catch (error) {
        console.log("delete unsuccessfull", error.message);
      }finally{
        setIsLoading(false)
      }
    };
    deleted();
  }, [gallery, onDeleteImage]);
  return <div>
          {isLoading && <div className="flex justify-center">
        <PulseLoader color="#36D7B7" loading={true}/>
      </div> }
  </div>;

};

export default DeleteImage;
