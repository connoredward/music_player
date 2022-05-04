import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const reviews = new Schema({
  text: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  best: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  album: {
    type: String,
    required: true,
  },
});

// @ts-ignore
mongoose.models = {};

const Reviews = mongoose.model('Reviews', reviews);

export default Reviews;
