const mongoose = require('mongoose');

module.exports = {
  connectToDB: async () => {
    try {
      mongoose.connect('mongodb://localhost:27017/storedImagesUsingMulter');
      console.log('Database connected successfully');
    } catch (err) {
      console.log('Error while connecting to database');
    }
  },
};
