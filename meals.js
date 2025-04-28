const express = require("express");
const Meal = require("../models/Meal");
const router = express.Router();

// Middleware to check if user is authenticated (assuming you have JWT authentication middleware in place)
const authenticate = require('../middleware/authenticate');

// ** CREATE: Add a new meal **
router.post("/create", authenticate, async (req, res) => {
    const { name, ingredients, nutrition, description, image } = req.body;
    const userId = req.user.id; // Assuming user is authenticated and their ID is in `req.user.id`

    try {
        const meal = new Meal({
            name,
            ingredients,
            nutrition,
            description,
            image,
            userId, // Link meal to the user
        });

        await meal.save(); // Save the meal to the database
        res.status(201).json(meal); // Respond with the newly created meal
    } catch (err) {
        res.status(500).json({ message: "Error creating meal", error: err });
    }
});

// ** READ: Get all meals **
router.get("/", async (req, res) => {
    try {
        const meals = await Meal.find();  // Fetch all meals from the database
        res.status(200).json(meals);  // Respond with the list of meals
    } catch (err) {
        res.status(500).json({ message: "Error fetching meals", error: err });
    }
});

// ** READ: Get a specific meal by ID **
router.get("/:mealId", async (req, res) => {
    try {
        const meal = await Meal.findById(req.params.mealId);  // Find meal by ID
        if (!meal) return res.status(404).json({ message: "Meal not found" });
        res.status(200).json(meal);  // Respond with the meal data
    } catch (err) {
        res.status(500).json({ message: "Error fetching meal", error: err });
    }
});

// ** UPDATE: Update a meal by ID **
router.put("/:mealId", authenticate, async (req, res) => {
    const { name, ingredients, nutrition, description, image } = req.body;
    const userId = req.user.id;

    try {
        const meal = await Meal.findById(req.params.mealId);

        if (!meal) return res.status(404).json({ message: "Meal not found" });

        // Ensure the meal belongs to the authenticated user
        if (meal.userId.toString() !== userId) {
            return res.status(403).json({ message: "You are not authorized to update this meal" });
        }

        meal.name = name || meal.name;
        meal.ingredients = ingredients || meal.ingredients;
        meal.nutrition = nutrition || meal.nutrition;
        meal.description = description || meal.description;
        meal.image = image || meal.image;

        await meal.save();  // Save the updated meal
        res.status(200).json(meal);  // Respond with the updated meal
    } catch (err) {
        res.status(500).json({ message: "Error updating meal", error: err });
    }
});

// ** DELETE: Delete a meal by ID **
router.delete("/:mealId", authenticate, async (req, res) => {
    const userId = req.user.id;

    try {
        const meal = await Meal.findById(req.params.mealId);

        if (!meal) return res.status(404).json({ message: "Meal not found" });

        // Ensure the meal belongs to the authenticated user
        if (meal.userId.toString() !== userId) {
            return res.status(403).json({ message: "You are not authorized to delete this meal" });
        }

        await meal.remove();  // Remove the meal from the database
        res.status(200).json({ message: "Meal deleted successfully" });  // Respond with success
    } catch (err) {
        res.status(500).json({ message: "Error deleting meal", error: err });
    }
});

router.put("/toggle-favorite/:mealId", authenticate, async (req, res) => {
    try {
        const meal = await Meal.findById(req.params.mealId);

        if (!meal) return res.status(404).json({ message: "Meal not found" });

        // Toggle the favorite status
        meal.isFavorite = !meal.isFavorite;
        await meal.save(); // Save the updated meal

        res.status(200).json({ message: "Favorite status updated", meal });
    } catch (err) {
        res.status(500).json({ message: "Error toggling favorite", error: err });
    }
});

// routes/mealRoutes.js
router.get('/meals', async (req, res) => {
    try {
      const meals = await Meal.find(); // You can adjust this to fetch only featured meals
      res.status(200).json(meals);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });
  
router.post("/", authenticate, async (req, res) => {
    const meal = new Meal(req.body);
    try {
      const newMeal = await meal.save();
      res.status(201).json(newMeal);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  router.post('/ingredients', async (req, res) => {
    try {
        const { name, quantity } = req.body;
        const meal = new Meal({ name, quantity });
        await meal.save();
        res.json({ message: "Ingredient added successfully!" });
    } catch (error) {
        res.status(400).json({ error: "Failed to add ingredient" });
    }
});
  

module.exports = router;
