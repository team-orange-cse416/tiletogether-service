const _ = require('lodash');
const { faker } = require('@faker-js/faker');

const imageUrls = _.range(1, 30).map((i) => `/mock-layer-images/${i}.png`);

function randomImageURL () {
  return _.sample(imageUrls);
}

function randomLayer () {
  const type = _.sample(['group', 'layer']);
  const imageUrl = randomImageURL();
  return {
    type,
    name: faker.lorem.word(),
    layers: [],
    tilesetLayerUrl: type === 'layer' ? imageUrl : undefined,
  };
}

// create random recursive tree structure
// Example usage
// const tree = createRandomTree(3, 3, 3);
// console.log(JSON.stringify(tree));
function createRandomTree (maxDepth) {
  const layers = [];
  const layerCount = _.random(3, 5);

  // create layers
  for (let i = 0; i < layerCount; i++) {
    layers.push(randomLayer());
  }

  // create tree helper
  const createTree = (layers, depth) => {
    if (depth === maxDepth) {
      return;
    }

    layers.forEach(layer => {
      if (layer.type === 'group') {
        const childCount = _.random(1, 5);
        for (let i = 0; i < childCount; i++) {
          layer.layers.push(randomLayer());
        }
        createTree(layer.layers, depth + 1);
      }
    });
  };

  // create tree
  createTree(layers, 0);

  return layers;
}

function randomMapLayer (width, height, lastTileIndex) {
  const type = 'layer';
  return {
    type,
    name: faker.lorem.word(),
    tiles: Array.from({ length: width * height }, () => _.random(0, lastTileIndex)),
  };
}

function createMapLayers (width, height, lastTileIndex) {
  const layers = [];
  const layerCount = _.random(3, 5);

  // create layers
  for (let i = 0; i < layerCount; i++) {
    layers.push(randomMapLayer(width, height, lastTileIndex));
  }

  return layers;
}

module.exports = { createRandomTree, createMapLayers, randomImageURL };
