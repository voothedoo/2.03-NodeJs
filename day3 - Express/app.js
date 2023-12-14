import express from "express";
import 'dotenv/config';
import recipes from "./recipes.js";

const PORT = 3000;
const app = express();
const api = process.env.API_KEY;

app.set("view engine", "ejs");
app.use(express.json());

app.listen(PORT, () => {
  console.log("Server running on http://localhost:3000");
});

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

app.get("/info", (req, res) => {
  res.render("info");
});

const checkApi = (req, res, next) => {
  if (req.params.api === api) {
    next();
  } else {
    res.status(403).json({ error: "Access denied. Incorrect API key" });
  }
};

app.use(`/:api/recipe/:id`, checkApi, (req, res, next) => {
  const recipeId = parseInt(req.params.id);
  const recipe = recipes.find(recipe => recipe.id === recipeId);
  if (recipe) {
    return res.send(recipe);
  }
  next();
});

app.use(`/:api/recipe/:name`, checkApi, (req, res, next) => {
  const recipeName = req.params.name.toLowerCase();
  const recipe = recipes.filter(recipe => recipe.name.toLowerCase().includes(recipeName));
  if (recipe.length > 0) {
    return res.send(recipe);
  }
  next();
});

app.use(`/:api/recipe/:cuisine`, checkApi, (req, res, next) => {
  const cuisineName = req.params.cuisine.toLowerCase();
  const recipe = recipes.filter(recipe => recipe.cuisine.toLowerCase().includes(cuisineName));
  if (recipe.length > 0) {
    return res.send(recipe);
  }
  next();
});

app.use(`/:api/recipe/ingredients/:ingredients`, checkApi, (req, res, next) => {
  const ingredientsName = req.params.ingredients.toLowerCase();
  const recipe = recipes.filter(recipe =>
    recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(ingredientsName))
  );
  if (recipe.length > 0) {
    return res.send(recipe);
  }
  next();
});

app.use(`/:api/recipe/favorites`, checkApi, (req, res, next) => {
  const recipe = recipes.filter(recipe => recipe.favorite === true);
  if (recipe.length > 0) {
    return res.send(recipe);
  }
  next();
});

app.use((req, res) => {
  res.status(404).render("404");
});

