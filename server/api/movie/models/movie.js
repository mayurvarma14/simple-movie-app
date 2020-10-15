const mongoose = require('mongoose');

const { Schema } = mongoose;
const movieSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    imdbScore: {
      type: Number,
      required: true,
    },
    genre: {
      type: [{ type: Schema.Types.ObjectId, required: true }],
      ref: 'Genre',
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    popularity: {
      type: Number,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('Movie', movieSchema);
