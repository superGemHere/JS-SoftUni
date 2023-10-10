const router = require("express").Router();
const cubeService = require("../services/cubeService");
const accessoryService = require("../services/accessoryService");
const { extractErrorMsg } = require('../utils/errorHelpers');

const { isAuth } = require('../middlewares/authMiddleware')

const {getDifficultyOptionsViewData} = require('../utils/viewHelpers')

router.get("/create", isAuth, (req, res) => {
  res.render("cube/create");
});
router.post("/create", isAuth, async (req, res) => {
  const { name, description, imageUrl, difficultyLevel } = req.body;
  try {
    await cubeService.createCube({
      name,
      description,
      imageUrl,
      difficultyLevel: Number(difficultyLevel),
      owner: req.user.id,
    });
    res.redirect("/");
  } catch (err) {
    const firstErrorMsg = extractErrorMsg(err);
    res.status(400).render("cube/create", { errorMessage: firstErrorMsg });
  }
});

router.get("/:cubeId/details", async (req, res) => {
  const { cubeId } = req.params;

  const cube = await cubeService.getDetails(cubeId).lean();
  const hasAccessories = cube.accessories?.length > 0;

  if (!cube) {
    res.redirect("/404");
    return;
  }

  const hasOwner = cube.hasOwnProperty('owner') ? cube.owner : false;
  // console.log(hasOwner)

  const isOwner = hasOwner?.toString() === req.user?.id;
  // console.log(isOwner)

  res.render("cube/details", { ...cube, hasAccessories, isOwner });
});
router.get("/:cubeId/attach-accessory", isAuth, async (req, res) => {
  const { cubeId } = req.params;
  const cube = await cubeService.getDetails(cubeId).lean();
  const accessoryIds = cube.accessories ? cube.accessories.map((a) => a._id) : [];

  const accessories = await accessoryService.getNotAttached(accessoryIds).lean();

  const hasAccessories = accessories.length > 0;

  res.render("accessory/attach", { ...cube, accessories, hasAccessories });
});
router.post("/:cubeId/attach-accessory", isAuth, async (req, res) => {
  try {
    
    const { cubeId } = req.params;
    const { accessory: accessoryId } = req.body;
    
    await cubeService.attachAccessory(cubeId, accessoryId);
    
    res.redirect(`/cubes/${cubeId}/details`);
  } catch (err) {
    const firstErrorMsg = extractErrorMsg(err);
    res.status(400).render("accessory/attach", { errorMessage: firstErrorMsg });
  }
});

router.get('/:cubeId/delete', isAuth, async (req, res) => {
  const cube = await cubeService.getOne(req.params.cubeId).lean();

  const options = getDifficultyOptionsViewData(cube.difficultyLevel)

  res.render('cube/delete', { cube, options })
})
router.post('/:cubeId/delete', isAuth, async (req, res) => {
  
  await cubeService.delete(req.params.cubeId);

  res.redirect('/');
})
//edit
router.get('/:cubeId/edit', isAuth, async (req, res) => {
  const cube = await cubeService.getOne(req.params.cubeId).lean();

  const options = getDifficultyOptionsViewData(cube.difficultyLevel)

  res.render('cube/edit', { cube, options })
})
router.post('/:cubeId/edit', isAuth, async (req, res) => {
  try {
    
    const cubeData = req.body;
    await cubeService.update(req.params.cubeId, cubeData);
    res.redirect(`/cubes/${req.params.cubeId}/details`);
  } catch (err) {
    const firstErrorMsg = extractErrorMsg(err);
    res.status(400).render("cube/edit", { errorMessage: firstErrorMsg });
  }
})



module.exports = router;
