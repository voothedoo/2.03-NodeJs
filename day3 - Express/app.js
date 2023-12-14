import express from "express";
import 'dotenv/config';
import recipes from "./recipes.js";

const PORT = 3000;
const app = express();

app.set("view engine", "ejs");
app.use(express.json());

app.listen(PORT, () => {
  console.log("Server running on http://localhost:3000");
});

const api = process.env.API_KEY;

//routing
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/blog", (req, res) => {
  res.render("blog");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.use(`/:api/recipe/:id`, (req, res, next) => {
  let providedApi = req.params.api;
  const recipeId = parseInt(req.params.id);
  if (providedApi === api) {
    const recipe = recipes.find(recipe => recipe.id === recipeId);
    if (recipe) {
      return res.send(recipe);
    }
    next();
  } else {
    res.status(403).json({ error: "Access denied. Incorrect API key" });
  }

});

app.use(`/:api/recipe/:name`, (req, res, next) => {
  let providedApi = req.params.api;
  const recipeName = req.params.name.toLowerCase();
  if (providedApi === api) {
    const recipe = recipes.filter(recipe => recipe.name.toLowerCase().includes(recipeName));
    if (recipe.length > 0) {
      return res.send(recipe);
    }
    next();
  } else {
    res.status(403).json({ error: "Access denied. Incorrect API key" });
  }

});

app.use(`/:api/recipe/:cuisine`, (req, res, next) => {
  let providedApi = req.params.api;
  const cuisineName = req.params.cuisine.toLowerCase();
  if (providedApi === api) {
    const recipe = recipes.filter(recipe => recipe.cuisine.toLowerCase().includes(cuisineName));
    if (recipe.length > 0) {
      return res.send(recipe);
    }
    next();
  } else {
    res.status(403).json({ error: "Access denied. Incorrect API key" });
  }

});

app.use(`/:api/recipe/ingredients/:ingredients`, (req, res, next) => {
  let providedApi = req.params.api;
  const ingredientsName = req.params.ingredients.toLowerCase();
  if (providedApi === api) {
    const recipe = recipes.filter(recipe =>
      recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(ingredientsName))
    );
    if (recipe.length > 0) {
      return res.send(recipe);
    }
    next();
  } else {
    res.status(403).json({ error: "Access denied. Incorrect API key" });
  }

});

app.use(`/:api/recipe/favorites`, (req, res, next) => {
  let providedApi = req.params.api;
  if (providedApi === api) {
    const recipe = recipes.filter(recipe => recipe.favorite === true);
    if (recipe.length > 0) {
      return res.send(recipe);
    }
    next();
  } else {
    res.status(403).json({ error: "Access denied. Incorrect API key" });
  }

});

app.use((req, res) => {
  res.status(404).render("404");
});

