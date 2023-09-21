const express = require("express");
const handlebars = require("express-handlebars");
const PORT = 5050;
const app = express();
const path = require("path");

const { getCats } = require("./catalog.js");

//View Engine
app.engine("hbs", handlebars.engine({ extname: "hbs" }));
app.set("view engine", "hbs");

const staticFile = express.static("public");
app.use(staticFile);

app.get("/", (req, res) => {
  const cats = getCats();
    console.log(cats)
  res.render("home", { layout: "mainHome", cats });
});

app.get("/cats/add-breed", (req, res) => {
  res.render("add-breed");
});

app.get("/cats/add-cat", (req, res) => {
  res.render("add-cat");
});

app.get("*", (req, res) => {
  res.status(404);
  res.send("<h1> The page you are looking for was Not Found!</h1>");
});
app.listen(PORT, () => console.log(`Express running on port: ${PORT}`));
