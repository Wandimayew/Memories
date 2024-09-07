import React, { useState } from "react";
import { RiImageEditLine } from "react-icons/ri";
import { MdDeleteSweep } from "react-icons/md";
import EditGallery from "../EditGallery";
import DeleteImage from "../DeleteImage";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

const SingleGalleryCard = ({ gallery, onUpdateImage }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [deletes, setDeletes] = useState(false);

  // Ensure that gallery.file is an object with a public_id property
  if (
    !gallery.file ||
    typeof gallery.file !== "object" ||
    !gallery.file.public_id
  ) {
    console.error("Invalid gallery file structure:", gallery.file);
    return null;
  }
  // Extracting the public_id from gallery.file
  const publicId = gallery.file.public_id;
  const cloudinaryUrl = import.meta.env.VITE_REACT_APP_CLOUDINARY_URL

  const imageUrl = `${cloudinaryUrl}${publicId}`;
  const formattedDate = new Date(gallery.date).toLocaleDateString();
 
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleImageClick = (e) => {
    if (e.target.classList.contains("edit-icon")) {
      // console.log("edit icon clicked")
      console.log(imageUrl + "public id is " + gallery)
    } else if (e.target.classList.contains("delete-icon")) {
      console.log("delete clicked");
    } else {
      setIsEnlarged(!isEnlarged);
    }
  };
  const handleCloseClick = () => {
    setIsEnlarged(false);
    setDeletes(false);
  };
  return (
    <div>
      <div
        key={gallery._id}
        className="relative w-80 rounded-lg shadow-lg pb-4 bg-white"
      >
        <div className={`w-full relative group `} onClick={handleImageClick}>
          <img
            src={imageUrl}
            alt={gallery.title}
            className={`rounded-t-lg ${
              isEnlarged ? "cursor-zoom-out" : "cursor-pointer"
            } mb-3 w-full group h-48 object-cover group-hover:opacity-80 group-hover:saturate-200`}
            style={{ zIndex: isEnlarged ? 2 : 1 }}
          />
          {isEnlarged && (
            <div
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
              onClick={handleCloseClick}
              style={{ zIndex: 3 }}
            >
              <img
                src={imageUrl}
                alt={gallery.title}
                className="max-w-full max-h-full"
              />
            </div>
          )}

          <div className="absolute top-0 right-0 p-2">
            <div className="">
              <div
                onClick={toggleDrawer}
              >
                <RiImageEditLine
                  size={35}
                  className="z-9 text-slate-400  hover:text-slate-600 cursor-pointer edit-icon"
                />
              </div>
              <div
                onClick={() => {
                  setDeletes(true);
                }}
              >
                <MdDeleteSweep
                  size={35}
                  className="z-9 mt-3 flex text-slate-500 hover:text-slate-600 justify-items-end cursor-pointer delete-icon"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-1 ">
          <div className="flex flex-row justify-between ">
            <div>
              <h2 className="text-lg decoration-double text-slate-800 font-bold">
                {gallery.title.toUpperCase()}
              </h2>
              <div>
                <h2 className="text-sm text-gray-500 pt-2">
                  {gallery.detail}
                </h2>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div>
              <h4 className="text-sm text-slate-800 font-thin pt-1">
                {new Date(formattedDate).toLocaleDateString()}
              </h4>
            </div>
          </div>
        </div>
      </div>
      {deletes ? <DeleteImage gallery={gallery}  onDeleteImage={onUpdateImage} /> : null}
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="right"
        className="bla bla bla"
      >
      <EditGallery gallery={gallery}  onUpdateImage={onUpdateImage}/>
      </Drawer>
    </div>
  );
};
export default SingleGalleryCard;
