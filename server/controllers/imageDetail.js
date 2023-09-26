const imageModal = require('../model/imageDetail');

module.exports = {
  uploadImage: async (req, res) => {
    try {
      // console.log(req.file.path, 'This is req.body');
      const { filename } = req.file;
      console.log(filename, 'This is filename');
      // const { path } = req.file;  will add upload before time like "upload/3243423421341234123432Ahmad.jpg"
      const newImage = await imageModal.create({ image: filename });
      res.status(201).send({ newImage, message: 'Image add successfully' });
    } catch (err) {
      console.log(err);
    }
  },
  getAllImages: async (req, res) => {
    try {
      const images = await imageModal.find();
      res
        .status(200)
        .send({ images, success: true, message: 'Images fetch successfully' });
    } catch (err) {
      console.log(err, 'something went wrong while calling getAllImages Api');
    }
  },
};
