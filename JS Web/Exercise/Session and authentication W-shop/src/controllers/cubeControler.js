const router = require("express").Router();
const cubeService = require("../services/cubeService");
const accessoryService = require("../services/accessoryService");

router.get("/create", (req, res) => {
  res.render("cube/create");
});
router.post("/create", async (req, res) => {
  const { name, description, imageUrl, difficultyLevel } = req.body;
  await cubeService.createCube({
    name,
    description,
    imageUrl,
    difficultyLevel: Number(difficultyLevel),
    owner: req.user.id,
  });
  res.redirect("/");
});

router.get("/:cubeId/details", async (req, res) => {
  const { cubeId } = req.params;

  const cube = await cubeService.getDetails(cubeId).lean();
  const hasAccessories = cube.accessories?.length > 0;

  if (!cube) {
    res.redirect("/404");
    return;
  }

  res.render("cube/details", { ...cube, hasAccessories });
});
router.get("/:cubeId/attach-accessory", async (req, res) => {
  const { cubeId } = req.params;
  const cube = await cubeService.getDetails(cubeId).lean();
  const accessoryIds = cube.accessories ? cube.accessories.map((a) => a._id) : [];
  
  const accessories = await accessoryService.getNotAttached(accessoryIds).lean();

  const hasAccessories = accessories.length > 0;

  res.render("accessory/attach", { ...cube, accessories, hasAccessories });
});
router.post("/:cubeId/attach-accessory", async (req, res) => {
  const { cubeId } = req.params;
  const { accessory: accessoryId } = req.body;

  await cubeService.attachAccessory(cubeId, accessoryId);

  res.redirect(`/cubes/${cubeId}/details`);
});

router.get('/:cubeId/delete', async (req, res) => {
  const cube = await cubeService.getOne(req.params.cubeId).lean();

  res.render('cube/delete', { cube })
})

module.exports = router;
