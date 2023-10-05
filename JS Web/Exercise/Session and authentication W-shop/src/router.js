const router = require("express").Router();
const homeControler = require("./controllers/homeControler");
const cubeControler = require("./controllers/cubeControler");
const accessoryControler = require("./controllers/accessoryControler");
const userController = require("./controllers/userController");

router.use(homeControler);

router.use("/cubes", cubeControler);

router.use("/accessories", accessoryControler);

router.use("/users", userController);

router.get("*", (req, res) => {
  res.redirect("/404");
});

module.exports = router;
