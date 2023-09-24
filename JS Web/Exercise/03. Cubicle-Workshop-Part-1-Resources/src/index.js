const express = require("express");
const handlebars = require("express-handlebars");
const path = require('path')
const app = express();
const CLIENT_PORT = 5050;

//Handlebars Configuration
app.engine("hbs", handlebars.engine({ extname: "hbs" }));
app.set("view engine", "hbs");
app.set("views", "src/views");

// Set-up static files
const staticFiles = express.static(path.resolve(__dirname, "public"));
app.use(staticFiles);


app.get("/", (req, res) => {
  res.render("index");
});

app.listen(CLIENT_PORT, () =>
  console.log(`Express running on port: ${CLIENT_PORT}`)
);
