const express = require("express");
const app = express();
const cors = require("cors");
const { initializeDatabase } = require("./db/db");
const Dish = require("./models/dish.model");

const corsOptions = {
  origin: "*",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

initializeDatabase();

// Seed data
async function seedData(data) {
  try {
    const dish = new Dish(data);
    const savedDish = await dish.save();
    return savedDish;
  } catch (error) {
    console.error("Error seeding data:", error);
  }
}

// Route to add a dish
app.post("/dish", async (req, res) => {
  try {
    const dish = await seedData(req.body);
    if (dish) {
      res.status(200).json({ message: "Dish added successfully.", dish });
    } else {
      res.status(500).json({ error: "Failed to add dish." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to add dish." });
  }
});

// Get all dishes
async function getDishes() {
  try {
    const dishes = await Dish.find();
    return dishes;
  } catch (error) {
    console.error("Error fetching dishes:", error);
  }
}

app.get("/dish", async (req, res) => {
  try {
    const dishes = await getDishes();
    if (dishes.length > 0) {
      res.json(dishes);
    } else {
      res.status(404).json({ error: "No dishes found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the dishes" });
  }
});

// Get dish by title
async function getDishByTitle(dishTitle) {
  try {
    const dish = await Dish.findOne({ name: dishTitle });
    return dish;
  } catch (error) {
    console.error("Error fetching dish by title:", error);
  }
}

app.get("/dish/name/:dishTitle", async (req, res) => {
  try {
    const dish = await getDishByTitle(req.params.dishTitle);
    if (dish) {
      res.json(dish);
    } else {
      res.status(404).json({ error: "Dish not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch dish" });
  }
});

// Get dish by ID
app.get("/dish/id/:id", async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.id);
    if (dish) {
      res.json(dish);
    } else {
      res.status(404).json({ error: "Dish not found." });
    }
  } catch (error) {
    console.error("Error fetching dish by ID:", error);
    res.status(500).json({ error: "Failed to fetch dish." });
  }
});

// Delete dish by ID
async function deleteById(dishId) {
  try {
    const deletedDish = await Dish.findByIdAndDelete(dishId);
    return deletedDish;
  } catch (error) {
    console.error("Error deleting dish:", error);
  }
}

app.delete("/dish/:dishId", async (req, res) => {
  try {
    const deletedDish = await deleteById(req.params.dishId);
    if (deletedDish) {
      res.status(200).json({
        message: "Dish deleted successfully.",
        dish: deletedDish,
      });
    } else {
      res.status(404).json({ error: "Dish not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the dish" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
