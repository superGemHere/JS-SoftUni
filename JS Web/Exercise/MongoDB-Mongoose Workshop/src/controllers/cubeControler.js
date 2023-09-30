const router = require("express").Router();
const cubeService = require("../services/cubeService");
const accessoryService = require("../services/accessoryService");

router.get("/create", (req, res) => {
  console.log(cubeService.getAll());
  res.render("cube/create");
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

router.get("/:cubeId/details", async (req, res) => {
  const { cubeId } = req.params;
  // console.log(cubeId)
  const cube = await cubeService.getDetails(cubeId).lean();
  const hasAccessories = cube.accessories?.length > 0;
  // console.log(cube);
  if (!cube) {
    res.redirect("/404");
    return;
  }

  res.render("cube/details", { ...cube, hasAccessories });
});
router.get("/:cubeId/attach-accessory", async (req, res) => {
  const { cubeId } = req.params;
  const cube = await cubeService.getDetails(cubeId).lean();
  const accessories = await accessoryService.getAll().lean();

  const hasAccessories = accessories.length > 0;

  res.render("accessory/attach", { ...cube, accessories, hasAccessories });
});
router.post("/:cubeId/attach-accessory", async (req, res) => {
  const { cubeId } = req.params;
  const { accessory: accessoryId } = req.body;

  await cubeService.attachAccessory(cubeId, accessoryId);

  res.redirect(`/cubes/${cubeId}/details`);
});

module.exports = router;
