const uniqId = require("uniqid");

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

exports.createCube = cubeData => {
  const newCube = {
    id: uniqId(),
    ...cubeData
  };
  cubes.push(newCube);

  return newCube;
};

exports.getDetails = id => {
  return cubes.find(cube => cube.id === id);
};

exports.getAll = (search, from, to) => {
  let filterCubes = [...cubes];
  if (search) {
    filterCubes = filterCubes.filter((cube) => {
      return cube.name.toLowerCase().includes(search.toLowerCase())
    });
  };

  if (from) {
    filterCubes = filterCubes.filter(cube => {
      return cube.difficultyLevel >= Number(from);
    });
  };

  if (to) {
    filterCubes = filterCubes.filter(cube => {
      return cube.difficultyLevel <= Number(to);
    });
  };
  
  return filterCubes;
};
