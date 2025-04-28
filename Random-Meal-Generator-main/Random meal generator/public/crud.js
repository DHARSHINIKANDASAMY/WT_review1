const mongoose = require('mongoose');
const Meal = require('../models/Meal');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mealsDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Failed to connect to MongoDB', err));

// ** CREATE: Insert a new meal **
const createMeal = async () => {
    const meal = new Meal({
        name: "Grilled Chicken",
        ingredients: ["Chicken", "Spices", "Olive oil"],
        description: "Delicious grilled chicken",
        isFavorite: false,
    });
    await meal.save();
    console.log('Meal created:', meal);
};

// ** READ: Find all meals **
const findMeals = async () => {
    const meals = await Meal.find();
    console.log('All meals:', meals);
};

// ** UPDATE: Update a meal's favorite status **
const updateMeal = async () => {
    const meal = await Meal.findOne({ name: "Grilled Chicken" });
    meal.isFavorite = true;
    await meal.save();
    console.log('Updated meal:', meal);
};

// ** DELETE: Delete a meal **
const deleteMeal = async () => {
    const meal = await Meal.findOneAndDelete({ name: "Grilled Chicken" });
    console.log('Deleted meal:', meal);
};

// Call CRUD operations
const run = async () => {
    await createMeal();
    await findMeals();
    await updateMeal();
    //await deleteMeal();
};

run();
