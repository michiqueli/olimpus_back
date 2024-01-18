const { Router } = require("express");
const router = Router();
const Multer = require("multer");
const UploadControllers = require ('../controllers/upload.controllers')
const storage = new Multer.memoryStorage();
const upload = Multer({
  storage,
});


router.post("/", upload.single("my_file"), UploadControllers.uploadImage)

module.exports = router;