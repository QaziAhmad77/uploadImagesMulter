const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  image: {
    type: String,
    required: [true, 'image is required'],
  },
});

const imageModel = mongoose.model('images', imageSchema);
module.exports = imageModel;
