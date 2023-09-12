const http = require("http");
const homeHTML = require("./views/home/index");
const siteCss = require("./content/styles/site");
const addBreedHTML = require('./views/addBreed');
const addCatHTML = require('./views/addCat');

const server = http.createServer(async (req, res) => {
  console.log("Server is called.");
  console.log(req.url);

  if (req.url == "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(homeHTML);
  } else if (req.url == `/content/styles/site.css`) {
    res.writeHead(200, { "Content-Type": "text/css" });
    res.write(siteCss);
  } else if(req.url ==`/cats/add-breed`){
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(addBreedHTML);
  } else if(req.url ==`/cats/add-cat`){
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(addCatHTML);
  }
  res.end();
});

server.listen(5000, () => console.log("Server running on port 5000.."));
