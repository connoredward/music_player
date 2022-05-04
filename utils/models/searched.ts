import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const searched = new Schema({
  videoId: {
    type: String,
    required: true,
  },
  searchedValue: {
    type: String,
    required: true,
  },
});

// @ts-ignore
mongoose.models = {};

const Searched = mongoose.model('Searched', searched);

export default Searched;