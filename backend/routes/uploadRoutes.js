import path from "path";
import express from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import { config } from "dotenv";
const router = express.Router();

config();

const storage = multer.diskStorage({});
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only");
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// connect to /api/uploads
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      public_id: "eujin03/image-uploads/" + (Date.now() % 5),
      overwrite: true,
      resource_type: "image",
    });
    res.json({
      success: true,
      url: uploadResult.url,
    });
  } catch (err) {
    res.json({ success: false });
    console.log(err);
  }
});

export default router;
