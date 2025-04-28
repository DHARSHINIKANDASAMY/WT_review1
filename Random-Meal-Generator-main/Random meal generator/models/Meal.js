const mongoose = require("mongoose");
//const Meal = require('../models/Meal');

// Define the meal schema
const mealSchema = new mongoose.Schema({
    name: { type: String, required: true },          // Name of the meal
    ingredients: [String],                           // Ingredients in the meal
    nutrition: String,                               // Nutrition info
    description: String,                             // Description of the meal
    image: String,
    isFavorite: { type: Boolean, default: false },                                  // Image URL or file path for the meal
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },  // Reference to the user who created the meal
}, { timestamps: true });  // Automatically add createdAt and updatedAt fields

// Create a model for the meal schema
const Meal = mongoose.model("meals", mealSchema);

module.exports = Meal;
