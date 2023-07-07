const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  date: {
    type: Date
  },
  photos: {
    type: Array
  },
  privacy: {
    type: Boolean
  },
  userId: {
    type: mongoose.ObjectId
  }
});

const Trip = mongoose.model('Trip', TripSchema);

module.exports = Trip