const express = require("express");
const handlebars = require("express-handlebars");
const PORT = 5050;
const app = express();
const path = require("path");
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' })

const publicDir = path.join(__dirname,'/public/uploads'); 


const { getCats, createCat, checkImageLocation } = require("./catalog.js");
const { getCatBreeds, pushBreed } = require('./catbreed.js');


                //View Engine
app.engine("hbs", handlebars.engine({ extname: "hbs" }));
app.set("view engine", "hbs");

               //3-rd party MiddleWare
const bodyParser = express.urlencoded({extended: false});
app.use(bodyParser);
              //MiddleWares
const staticFile = express.static("public");
app.use(staticFile);
app.use(express.static(publicDir));

app.get("/", (req, res) => {
  const cats = getCats();
  console.log(cats)
  res.render("home", { layout: "mainHome", cats });
});

          //Add-Breed
app.get("/cats/add-breed", (req, res) => {
  res.render("add-breed");
});

app.post("/cats/add-breed", (req, res) => {
  // console.log(req.body);
  console.log(`You used method: ${JSON.stringify(req.method)} on URL path: ${JSON.stringify(req.path)} with data: ${JSON.stringify(req.body)}`)
  const breedArr = getCatBreeds();
  pushBreed(breedArr, req.body)
  console.log(`Redirected to "/"`);
  res.redirect('/');
});

            //Add-Cat
app.get("/cats/add-cat", (req, res) => {
  const breedArr = getCatBreeds();
  res.render("add-cat", {breedArr});
});

app.post("/cats/add-cat", upload.single('upload'), (req, res) => {
  const catsArr = getCats();
  const newCat = req.body;
  newCat.imageUrl = req.file.filename;
  // console.log(catsArr);
 createCat(catsArr, req.body)
 res.redirect('/');
});

app.get("*", (req, res) => {
  res.status(404);
  res.send("<h1> The page you are looking for was Not Found!</h1>");
});
app.listen(PORT, () => console.log(`Express running on port: ${PORT}`));
