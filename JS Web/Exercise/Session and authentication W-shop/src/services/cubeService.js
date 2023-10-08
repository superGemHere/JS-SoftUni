const Cube = require("../models/Cube");

const cubes = [
  {
    id: "r2wbxjzklmz6w15g",
    name: "cube1",
    description: "N/A",
    imageUrl:
      "https://images.saymedia-content.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cq_auto:eco%2Cw_1200/MTk3MDg5MjU5NDA3MDI1MjM1/rubik-cube-algorithms.png",
    difficultyLevel: 1
  },
  {
    id: "r2wbxjzklmz6w15z",
    name: "cube2",
    description: "N/A",
    imageUrl:
      "https://images.saymedia-content.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cq_auto:eco%2Cw_1200/MTk3MDg5MjU5NDA3MDI1MjM1/rubik-cube-algorithms.png",
    difficultyLevel: 1
  }
];

exports.createCube = async cubeData => {
  const newCube = await Cube.create(cubeData);

  // const newCube = new Cube(cubeData);
  // await newCube.save()

  return newCube;
};

exports.getDetails = (id) => Cube.findById(id).populate("accessories");
exports.getOne = (id) => Cube.findById(id);

exports.getDetailsLean = id => {
  return Cube.findById(id).lean();
  // return cubes.find(cube => cube.id === id);
};

exports.getAll = async (search, from, to) => {
  // let filterCubes = [...cubes];
  const filterCubes = await Cube.find().lean();

    // TODO: This will be filtered later with mongoose.
  if (search) {
    filterCubes = filterCubes.filter(cube => {
      return cube.name.toLowerCase().includes(search.toLowerCase());
    });
  }

  if (from) {
    filterCubes = filterCubes.filter(cube => {
      return cube.difficultyLevel >= Number(from);
    });
  }

  if (to) {
    filterCubes = filterCubes.filter(cube => {
      return cube.difficultyLevel <= Number(to);
    });
  }
  
  return filterCubes;
};

exports.attachAccessory = async (cubeId, accessoryId) => {
  const cube = await this.getDetails(cubeId);
  cube.accessories.push(accessoryId);
  return cube.save();

}