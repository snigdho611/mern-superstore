import multer from "multer";
import path from "path";

const fileStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    if (file) {
      if (
        req.originalUrl === "/admin/products/update-image" ||
        req.originalUrl === "/admin/products/add"
      ) {
        callback(null, "files/products");
      } else if (req.originalUrl === "/admin/products/add") {
      }
    } else {
      callback("No file is found", null);
    }
  },
  filename: (req, file, callback) => {
    if (file) {
      callback(
        null,
        file.originalname.split(".")[0].replace(/\ /g, "") +
        Date.now() +
        path.extname(file.originalname)
      );
      return;
    } else {
      callback("No file is found", null);
    }
  },
});

const checkImage = (req, file, callback) => {
  if (file) {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png"
    ) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  } else {
    callback("No file found", false);
  }
};

const fileUploader = multer({
  storage: fileStorage,
  limits: 30000,
  fileFilter: checkImage,
});

module.exports = fileUploader;
