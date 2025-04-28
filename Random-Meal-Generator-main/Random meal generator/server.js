const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");;
const mealRoutes = require("./routes/meals");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = 5000;


// Middleware
app.use(cors());
app.use(bodyParser.json());
//app.use("/api/auth", authRoutes);


// ✅ Serve static files (HTML, CSS, images) from "public" folder
app.use(express.static("public"));

app.use("/Images", express.static("Images"));
app.use("/api/auth", authRoutes);
app.use("/api/meals", mealRoutes);
// MongoDB connection
mongoose.connect("mongodb://localhost:27017/mealsDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB!");
}).catch((err) => {
    console.error("MongoDB connection error:", err);
});

// Define Schema and Model
/*const mealSchema = new mongoose.Schema({
    name: String,
    ingredients: [String],
    nutrition: String,
    description: String,
    image: String
});

const Meal = mongoose.model("Meal", mealSchema);
*/
// API Routes
// Serve index.html manually at root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

  

app.post("/api/meals", async (req, res) => {
    const newMeal = new Meal(req.body);
    await newMeal.save();
    res.status(201).json(newMeal);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
