//Imports
const express = require("express");
const handlebarsConfig = require("./config/handlebarsConfig");
const expressConfig = require("./config/expressConfig");
const constants = require("./constants");
const routes = require("./router");
const dbConnect = require('./config/dbConfig')


//Local Variables
const app = express();

//Configurations
expressConfig(app);
handlebarsConfig(app);

//Connecting to DB
dbConnect()
.then(() => console.log('Successfully connected to DataBase'))
.catch((err) => console.log(`Failed attempt to connect to DataBase : ${err}`));

//Routing using it like middlewares

app.use(routes);


app.listen(constants.CLIENT__PORT, () =>
  console.log(`Express running on port: ${constants.CLIENT__PORT}`)
);
