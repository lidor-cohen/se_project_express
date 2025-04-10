const { Schema, model } = require("mongoose");

const clothingItemSchema = Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  weather: {
    type: String,
    required: true,
    enum: ["hot", "warm", "cold"],
  },
  imageUrl: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      required: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = model("clothingItem", clothingItemSchema);
