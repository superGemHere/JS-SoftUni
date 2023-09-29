const router = require("express").Router();
const homeControler = require("./controllers/homeControler");
const cubeControler = require("./controllers/cubeControler");
const accessoryControler = require('./controllers/accessoryControler')

router.use(homeControler);

router.use('/cubes', cubeControler);

router.use('/acessories', accessoryControler)


router.get('*', (req, res) =>{
    res.redirect('/404')
});

module.exports = router;