import { v2 as cloudinary } from "cloudinary";
import gallerys from "../model/Gallery.js";
import fs from "fs";

cloudinary.config({
  cloud_name: "dcpehgnee",
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
  // api_key: "843599552916561",
  // api_secret: "D6q2oDpQf-NJdyqhKv8NJhl6k9k",
});

export const uploadImage = async (req, res) => {
  try {
    const { title, date, detail, user } = req.body;
    const files = req.files;

    console.log(files);
    console.log(req.body);
    const file = files["file"][0];

    let imageFileResult;

    //upload image file to cloudinary
    imageFileResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        file.path,
        {
          timeout: 60000,
          folder: "gallerys",
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            reject(new Error("faild to upload image"));
          } else {
            //upload was successfull, resolve the promise with the result
            resolve(result);
          }
        }
      );
    });
    // save image URLs to the database
    const image = await gallerys.create({
      file: {
        public_id: imageFileResult.public_id,
        secure_id: imageFileResult.secure_id,
      },
      title: title,
      date: date,
      detail: detail,
      user: user,
    });
    //delete the uploaded local files
    fs.unlink(file.path, (error) => {
      if (error) {
        console.error("faild to delete image file:", error);
      }
    });

    res.status(201).json({ message: "image uploaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "failed to upload image" });
  }
};
export const getGallery = async (req, res) => {
  const { id } = req.params;

  try {
    const gallery = await gallerys.find({ user: id });
    if (gallery) {
      //displaying gallery
      console.log("Gallery found:", gallery);
      res.json({ success: true, gallery });
    } else {
      // If the gallery is not found, send an error message
      res.status(401).json({ success: false, message: "gallery not found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
export const editGallery = async (req, res) => {
  const { id } = req.params;
  const { title, detail, date } = req.body;
  console.log(id);
  try {
    // Check if the provided ID is valid
    if (!id) {
      console.log(id);
      return res
        .status(400)
        .json({ success: false, message: "Gallery ID is required" });
    }

    // Check if the gallery with the provided ID exists
    const existingGallery = await gallerys.findById(id);

    if (!existingGallery) {
      return res
        .status(404)
        .json({ success: false, message: "Gallery not found" });
    }

    // Update the gallery with the new data
    existingGallery.title = title || existingGallery.title;
    existingGallery.detail = detail || existingGallery.detail;
    existingGallery.date = date || existingGallery.date;

    // Save the updated gallery
    const updatedGallery = await existingGallery.save();

    res.json({
      success: true,
      gallery: updatedGallery,
      message: "Gallery updated successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
export const deleteGallery = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await gallerys.deleteOne({ _id: id });
    if (response.deletedCount > 0) {
      // If the deletion was successful, fetch the updated gallery data
      const updatedGallery = await gallerys.find();

      res.json({ success: true, gallery: updatedGallery });
    } else {
      // If the gallery is not found, send an error message
      res.status(401).json({ success: false, message: "Gallery not deleted" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
