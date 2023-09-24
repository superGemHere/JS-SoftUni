//Imports
const express = require("express");
const handlebarsConfig = require('./config/handlebarsConfig');
const expressConfig = require("./config/expressConfig");
const constants = require('./constants');
//Local Variables
const app = express();
const CLIENT_PORT = 5050;

//Configurations
expressConfig(app);
handlebarsConfig(app);





app.get("/", (req, res) => {
  res.render("index");
});

app.listen(constants.CLIENT__PORT, () =>
  console.log(`Express running on port: ${constants.CLIENT__PORT}`)
);
