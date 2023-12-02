import React, { useEffect, useState } from "react";
import Profile from "./Profile";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AddImage from "./AddImage";
import Gallery from "./gallery/Gallery";
import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import memoryicon from "../assets/memoryicon.jpg";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { useSnackbar } from "notistack";

const Home = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [galleryImages, setGalleryImages] = useState([]);
  const [hidden, setHidden] = useState("");
  const [count, setCount] = useState(1);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleLogOut = () => {
    logout();
    navigate("/");
  };
  const updateGallery = async (newImage) => {
    await setGalleryImages((prevImages) => {
      const newImages = [...prevImages, newImage];
      return newImages;
    });
  };
  useEffect(() => {
    if (count % 2 === 0) {
      setHidden("hidden");
    } else {
      setHidden("");
    }
  }, [count]);

  const handleProfileClick = () => {
    setIsProfileOpen(true);
  };

  const handleCloseProfile = () => {
    setIsProfileOpen(false);
  };

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/users/home/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            timeout: 5000,
          }
        );
      } catch (error) {
        enqueueSnackbar("Error validating Token and Unable to Fetch User", {
          variant: "warning",
        });
        console.error("Error validating token:", error);
        console.error("error fetching user");
      }
    };
    checkTokenValidity();
  }, [id, logout]);

  return (
    <div>
      <div className="fixed top-0 z-50 flex w-full justify-between px-20 max-lg:px-2 py-2 shadow-lg bg-white ">
        <div className="flex  gap-2">
          <img
            src={memoryicon}
            className="h-10 w-15 rounded-full"
            alt="memory icon"
          />
          <h1 className=" text-xl text-left pt-2 font-extrabold text-blue-500">
            Memories
          </h1>
        </div>
        <div className=" flex justify-center gap-3">
          <CgProfile
            size={30}
            onClick={() => {
              handleProfileClick();
            }}
            className="cursor-pointer rounded-sm hover:text-blue-500"
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Profile"
          />
          <BiLogOut
            className="cursor-pointer rounded-lg text-2xl hover:text-red-600 "
            size={30}
            onClick={() => handleLogOut()}
            data-tooltip-id="my-tooltip"
            data-tooltip-content="LogOut"
          />
          <Tooltip id="my-tooltip" type="error" effect="solid" />
        </div>
      </div>
      <div className="flex gap-6 justify-between mt-20">
        {isProfileOpen ? (
          <div className="flex justify-center w-full h-full">
            <Profile onClose={handleCloseProfile} />
          </div>
        ) : (
          <div className={`w-full flex-1 lg:w-2/3`}>
            <Gallery gallery={galleryImages} />
          </div>
        )}
        <div className="fixed  z-60 right-0 w-10 h-10 flex justify-end mt-10 mx-4">
          <div
            onClick={toggleDrawer}
            className={`text-2xl ${hidden}  text-white -left-5  bg-blue-600 rounded-full w-10 h-10 text-center py-[0.15rem] cursor-pointer hover:bg-blue-500`}
          >
            =
          </div>
        </div>
      </div>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="right"
        className="bla bla bla"
      >
        <AddImage onAddImage={updateGallery} />
      </Drawer>
    </div>
  );
};
export default Home;
