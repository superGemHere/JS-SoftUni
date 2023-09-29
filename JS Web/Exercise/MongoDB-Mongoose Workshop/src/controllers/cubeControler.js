const router = require("express").Router();
const cubeService = require("../services/cubeService");

router.get("/create", (req, res) => {
  console.log(cubeService.getAll());
  res.render("create");
});
router.post("/create", async (req, res) => {
  const { name, description, imageUrl, difficultyLevel } = req.body;
    await cubeService.createCube({
      name,
      description,
      imageUrl,
      difficultyLevel: Number(difficultyLevel)
    });
  res.redirect("/");
});

router.get("/:cubeId/details", (req, res) => {
  const { cubeId } = req.params;
  const cube = cubeService.getDetails(cubeId);

  if (!cube) {
    res.redirect("/404");
    return;
  }

  res.render("details", { ...cube });
});

module.exports = router;
