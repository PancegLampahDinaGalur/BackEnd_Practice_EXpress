const multer = require("multer");
const memoryStorage = multer.memoryStorage();
const path = require("path");

const publicPath = path.join(__dirname, "../../public");
const uploadPath = path.join(publicPath, "uploads");
console.log(uploadPath);

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const date = new Date();
    const formattedDate = date.toISOString().split("T")[0]; // Extract the date part in YYYY-MM-DD format
    const uniqueSuffix = formattedDate + "-" + Math.round(Math.random() * 1e9);
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

module.exports = {
  memory: multer({ storage: memoryStorage }),
  disk: multer({ storage: diskStorage }),
};
