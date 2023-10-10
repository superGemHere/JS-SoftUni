const mongoose = require("mongoose");

const cubeSchema = new mongoose.Schema({
  name: {
    required: [true, 'Cube name is required'],
    type: String,
    minLength: [5,'Cube name must be atleast 5 characters long'],
    match: [/^[A-Za-z0-9\s]+$/, 'Cube name can only contain alphanumeric characters and whitespaces']
  },
  description: {
    required: [true, 'Description is required'],
    type: String,
    minLength: [20,'Cube description must be atleast 20 characters long'],
    match: [/^[A-Za-z0-9\s]+$/, 'Cube description can only contain alphanumeric characters and whitespaces']
  },
  imageUrl: {
    required: [true, 'Image url is required'],
    type: String,
    match: [/^(http|https):\/\//, "Image url should start with \" http://\" or \"https://\""],
  },
  difficultyLevel: Number,

  accessories: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Accessory"
    }
  ],
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  }
});

const Cube = mongoose.model("Cube", cubeSchema);

module.exports = Cube;
