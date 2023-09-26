const express = require('express');
const router = express.Router();
const { uploadImage, getAllImages } = require('../controllers/imageDetail');
// First Method (here it will not save picture by its name but it will save it by randome numbers and text)
// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });

// Second Method (here it will save picture by its name and also will add time in melisecond to differenciate all the images)
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../public/images/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post('/upload-image', upload.single('image'), uploadImage);
router.get('/get-all-images', getAllImages);

module.exports = router;
