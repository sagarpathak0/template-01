const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    const originalName = file.originalname.replace(/\s+/g, "_");
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9) + "-" + originalName;
    cb(null, uniqueSuffix);
  },
});


const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|pdf|txt|docx|xlsx|xls|ppt|pptx/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only images and documents with extensions of JPEG, JPG, PNG, PDF, TXT, DOCX, XLSX, XLS, PPT, or PPTX are allowed."), false);
  }
};

const upload = multer({
  storage: storage,
//   fileFilter: fileFilter,
//   limits: { fileSize: 10 * 1024 * 1024 }, 
});

module.exports = upload