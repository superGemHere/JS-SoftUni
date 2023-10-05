const mongoose = require('mongoose');
const {CONNECTION__STRING} = require('../constants')


async function dbConnect(){
    await mongoose.connect(CONNECTION__STRING)
}

module.exports = dbConnect;