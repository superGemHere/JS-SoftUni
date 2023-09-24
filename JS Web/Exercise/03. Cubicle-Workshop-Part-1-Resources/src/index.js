const express = require("express");
const handlebars = require("express-handlebars");

const app = express();
const CLIENT_PORT = 5050;

app.engine("hbs", handlebars.engine({ extname: "hbs" }));
app.set("view engine", "hbs");
app.set("views", "src/views");

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(CLIENT_PORT, () =>
  console.log(`Express running on port: ${CLIENT_PORT}`)
);
