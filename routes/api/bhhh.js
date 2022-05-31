
const multer = require("multer");
const File = require("../../models").Document;
const express = require('express');
const router = express.Router();


//Configuration for Multer
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
  },
});

// Multer Filter
const multerFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[1] === "pdf") {
    cb(null, true);
  } else {
    cb(new Error("Not a PDF File!!"), false);
  }
};

//Calling the "multer" Function
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

router.post("/uploadFile", upload.single("myFile"), async (req, res) => {
    return res.json({
        success: false,
        msg: 'wandaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        file: req.file,
        files: req.data,
    });
  // Stuff to be added later
  //console.log(req.file);
  try {
    const newFile = await File.create({
      name: req.file.filename,
    });
    res.status(200).json({
      status: "success",
      message: "File created successfully!!",
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});

router.get("/api/getFiles", async (req, res) => {
  try {
    const files = await File.find();
    res.status(200).json({
      status: "success",
      files,
    });
  } catch (error) {
    res.json({
      status: "Fail",
      error,
    });
  }
});

router.use("/", (req, res) => {
  res.status(200).render("index");
});

module.exports = router;
