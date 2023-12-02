import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import Spinner from "./Spinner";

const AddImage = ({ onAddImage }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [detail, setDetail] = useState("");
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("date", date);
    formData.append("detail", detail);
    formData.append("user", id);
    if (file) {
      formData.append("file", file);
    }

    try {
      const response = await axios.post(
        "https://memory-2jvo.onrender.com/gallery/files",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
        { timeout: 100000 }
        );
        setLoading(true);
      const newImage = response.data;
      onAddImage({ gallery: [newImage] });
      enqueueSnackbar("Image Added Successfully", { variant: "success" });
      setLoading(false);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
        enqueueSnackbar(
          "Request Canceled by Axios, Please wait and try Latter",
          { variant: "error" }
        );
      } else if (error.response) {
        console.error(
          "Error adding image. Server responded with:",
          error.response.data
        );
        enqueueSnackbar("Request Canceled, Please wait and try Latter", {
          variant: "error",
        });
      } else {
        console.error("Error adding image:", error.message);
        console.error("Axios Error:", error);
        enqueueSnackbar("Error Adding Image", { variant: "error" });
      }
    }
  };

  return (
    
    <form className="w-full max-w-lg mx-auto  p-6 bg-white ">
      {loading && <Spinner />}
      <div className="mb-6">
        <label
          htmlFor="title"
          className="block text-sm font-semibold text-gray-600"
        >
          Title:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 p-2 w-full border border-solid rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="date"
          className="block text-sm font-semibold text-gray-600"
        >
          Date:
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 p-2 w-full border border-solid rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="detail"
          className="block text-sm font-semibold text-gray-600"
        >
          Detail:
        </label>
        <textarea
          id="detail"
          name="detail"
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          className="mt-1 p-2 w-full border border-solid rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        ></textarea>
      </div>

      <div className="mb-6">
        <label
          htmlFor="file"
          className="block text-sm font-semibold text-gray-600"
        >
          Add Image:
        </label>
        <input
          type="file"
          accept=".png, .jpg, .jpeg"
          id="file"
          name="file"
          onChange={handleFileChange}
          className="mt-1 p-2 w-full border border-solid rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
        {file && (
          <p className="text-sm mt-2">
            Uploading this image may take approximately{" "}
            {Math.ceil(file && (file.size / 1000000) * 40)} seconds.
            <br />
            Optimize your experience by using smaller file sizes.
          </p>
        )}
      </div>

      <div className="flex justify-center">
        <button
          className="py-2 px-4 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 focus:outline-none focus:ring focus:border-blue-300"
          onClick={handleSubmit}
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default AddImage;
