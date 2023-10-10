const router = require("express").Router();
const userService = require("../services/userService");
const { extractErrorMsg } = require("../utils/errorHelpers");

router.get("/register", (req, res) => {
  res.render("user/register");
});

router.post("/register", async (req, res) => {
  const { username, password, repeatPassword } = req.body;
  try {
    await userService.register({ username, password, repeatPassword });
    res.redirect("/users/login");
  } catch (err) {
    const firstErrorMsg = extractErrorMsg(err);
    // console.log(typeof err)
    res.status(400).render("user/register", { errorMessage: firstErrorMsg });
  }
});

router.get("/login", (req, res) => {
  res.render("user/login");
});
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const token = await userService.login(username, password);

    res.cookie("auth", token, { httpOnly: true });

    res.redirect("/");
  } catch (err) {
    const firstErrorMsg = extractErrorMsg(err);
    res.status(400).render("user/login", { errorMessage: firstErrorMsg });
  }
});
router.get("/logout", (req, res) => {
  res.clearCookie("auth");
  res.redirect("/");
});
module.exports = router;
