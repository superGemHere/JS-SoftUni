const router = require("express").Router();
const accessoryService = require("../services/accessoryService");
const { extractErrorMsg } = require("../utils/errorHelpers");

router.get("/create", (req, res) => {
  res.render("accessory/create");
});

router.post("/create", async (req, res) => {
  const { name, description, imageUrl } = req.body;
  try {
    await accessoryService.create({ name, description, imageUrl });

    res.redirect("/");
  } catch (err) {
    const firstErrorMsg = extractErrorMsg(err);
    res.status(400).render("accessory/create", { errorMessage: firstErrorMsg });
  }
});

module.exports = router;
