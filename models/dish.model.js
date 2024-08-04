const mongoose = require("mongoose");

// Define the schema
const dishSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    ingredients: {
      type: [String],
      required: true,
    },
    instructions: {
      type: [String],
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    cuisineType: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create the model
const Dish = mongoose.model("Dish", dishSchema);

module.exports = Dish;