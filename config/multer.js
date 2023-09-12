const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/");
  },

  filename: function (req, file, cb) {
    const unoSuffix = Date.now() + "_" + Math.round(Math.random) + 1e9;
    cb(
      null,
      file.fieldname + "_" + unoSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,

  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only Images are allowed"));
    }
  },
});

module.exports = upload;
