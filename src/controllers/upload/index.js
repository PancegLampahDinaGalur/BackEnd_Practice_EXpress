// Initial path: /controllers/upload/index.js
const BaseController = require("../base");
const express = require("express");
const router = express.Router();
const { memory, disk } = require("../../middlewares/upload");
const { uploader } = require("../../helpers/cloudinary");

class UploadController extends BaseController {
  constructor() {
    super();
    router.post("/", memory.single("file"), this.upload);
    router.post("/local", disk.single("file"), this.uploadDisk);
  }

  upload = async (req, res, next) => {
    try {
      const allowedFields = [
        "image/jpeg", // image/jpeg
        "image/png", // image/png
        "image/jpg", // image/jpg
        "image/svg+xml", // image/svg+xml
        "image/gif", // image/gif
        "apllication/pdf", // application/pdf
        "application/vnd.mx-excel", // application/vnd.mx-excel
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
      ];

      if (allowedFields.includes(req.file.mimetype) === false) {
        return next(new ValidationError("File type not allowed"));
      }

      const { file } = req;
      const fileBase64 = file.buffer.toString("base64");
      const fileDatauri = `data:${file.mimetype};base64,${fileBase64}`;

      const fileUpload = await uploader.upload(fileDatauri, {
        upload_preset: "car-rental",
        resource_type: "auto",
      });

      const size = req.file.size;
      if (size > 500000) {
        return res.status(400).json({ message: "File size is too large" });
      }
      return res.status(200).json(
        this.apiSend({
          code: 200,
          message: "File uploaded successfully",
          data: {
            url: fileUpload.secure_url,
            width: fileUpload.width,
            height: fileUpload.height,
            fromat: fileUpload.format,
            resource_type: fileUpload.resource_type,
          },
        })
      );
    } catch (e) {
      next(e);
    }
  };

  uploadDisk = async (req, res, next) => {
    try {
      const { file } = req;
      const allowedFields = [
        "image/jpeg", // image/jpeg
        "image/png", // image/png
        "image/jpg", // image/jpg
        "image/svg+xml", // image/svg+xml
        "image/gif", // image/gif
        "apllication/pdf", // application/pdf
        "application/vnd.mx-excel", // application/vnd.mx-excel
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
      ];

      if (allowedFields.includes(req.file.mimetype) === false) {
        return next(new ValidationError("File type not allowed"));
      }

      const proxyHost = req.headers["x-forwarded-host"] || req.headers["host"]; // untuk dinamic host

      res.status(200).json(
        this.apiSend({
          code: 200,
          message: "File uploaded successfully",
          data: {
            url: `http://${proxyHost}/public/uploads/${file.filename}`,
            filename: file.filename,
            mimetype: file.mimetype,
            size: file.size,
          },
        })
      );
    } catch (e) {
      next(e);
    }
  };
}

new UploadController();

module.exports = router;
