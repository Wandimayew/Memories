const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
// const { uploadImage } = require('../controler/galleryController');

const router2 = express.Router();
const uploadFolderPath = path.join(__dirname, "../uploads");
console.log(uploadFolderPath);
// Check if the upload folder exists, create it if it doesn't
if (!fs.existsSync(uploadFolderPath)) {
  fs.mkdirSync(uploadFolderPath);
}

const fileFilter = (req, file, cb) => {
  if (file.fieldname === "file") {
    // Check the file extensions for the image file png, .jpg, .jpeg
    if (file.originalname.match(/\.(png|jpg|jpeg|PNG|JPG|JPEG)$/)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Invalid file type. Only PNG, JPG, and JPEG files are allowed."
        )
      );
    }
  } else {
    // Ignore any other files
    cb(null, false);
  }
};

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadFolderPath);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB size limit
  },
});

// Handle upload
import("../controler/galleryController.js").then(({ uploadImage }) => {
  // Handle upload
  router2
    .route("/files")
    .post(upload.fields([{ name: "file", maxCount: 1 }]), uploadImage);
});
import("../controler/galleryController.js").then(({ getGallery }) => {
  router2.route("/files/get/:id").get(getGallery);
});
import("../controler/galleryController.js").then(({ editGallery }) => {
  router2.route("/files/edit/:id").get(editGallery);
});
import("../controler/galleryController.js").then(({ editGallery }) => {
  router2.route("/files/edit/:id").put(editGallery);
});
import("../controler/galleryController.js").then(({ deleteGallery }) => {
  router2.route("/files/delete/:id").delete(deleteGallery);
});

// /gallery/files/get/

module.exports = router2;
