const router = require("express").Router();
const homeControler = require("./controllers/homeControler");
const cubeControler = require("./controllers/cubeControler");

router.use(homeControler);

router.use('/cubes', cubeControler);


router.get('*', (req, res) =>{
    res.redirect('/404')
});

module.exports = router;