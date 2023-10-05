const Accessory = require("../models/Accessory");

exports.create = accessoryData => Accessory.create(accessoryData);

exports.getAll = () => Accessory.find();

exports.getNotAttached = accessoriesId => {
  return Accessory.find({ _id: { $nin: accessoriesId } });
};
