import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSnackbar } from "notistack";

const EditGallery = ({ gallery, onUpdateImage }) => {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const id = gallery._id;
  const { enqueueSnackbar } = useSnackbar();

  const changeTitleHandler = (e) => {
    setTitle(e.target.value);
  };
  const changeDetailHandler = (e) => {
    setDetail(e.target.value);
  };
  const changeDateHandler = (e) => {
    setDate(e.target.value || "");
  };
  const handleOnsubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .put(`http://localhost:5000/gallery/files/edit/${id}`, {
          title,
          detail,
          date,
        })
        .then((result) => {
          onUpdateImage(result.data.updatedImage);
          enqueueSnackbar("Image Updated Successfully", { variant: "success" });
        })
        .catch((error) => {
          console.log(error);
          enqueueSnackbar("Unable to Update Image, try again latter", {
            variant: "error",
          });
        });
    } catch (error) {
      enqueueSnackbar("Unable to Update Image, try again latter", {
        variant: "error",
      });
    }
  };
  useEffect(() => {
    const fetchgallery = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/gallery/files/edit/${id}`
        );
        const result = response.data.gallery;
        setTitle(result.title);
        setDetail(result.detail);
        setDate(result.date);
      } catch (error) {
        console.log(error);
      }
    };
    fetchgallery();
  }, []);
  return (
    <div className="f z-10  top-0 left-0 w-full h-full flex justify-end">
      <div className="max-w-md mx-auto  bg-white p-2 rounded-md shadow-md relative">
        <form
          onSubmit={handleOnsubmit}
          className="max-w-md mx-auto my-2 bg-white "
        >
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Title:
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={changeTitleHandler}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="detail"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Detail:
            </label>
            <input
              type="text"
              id="detail"
              value={detail}
              onChange={changeDetailHandler}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="date"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Date:
            </label>
            <input
              type="date"
              id="date"
              value={date || ""}
              onChange={changeDateHandler}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          >
            Done
          </button>
        </form>
      </div>
    </div>
  );
};
export default EditGallery;
