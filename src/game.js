"use strict";
const _ = require("lodash");
const selfProduct = arr => require('cartesian-product')([arr, arr]);

module.exports = {
    step,
    _forTest: {
        observableDeadField,
        neighbours,
        aliveNeighbours,
        isAlive
    }
};

function step(population) {
    return newCells(population).concat(survivedCells(population));
}

function newCells(population) {
    return observableDeadField(population).filter(_.partial(birthRule, _, population));
}

function survivedCells(population) {
    return _(population)
        .reject(_.partial(killLonelyRule, _, population))
        .reject(_.partial(killOvercrowdedRule, _, population))
        .value();
}

function birthRule(cell, population) {
    return aliveNeighbours(cell, population).length == 3;
}

function killLonelyRule(cell, population) {
    return aliveNeighbours(cell, population).length < 2;
}

function killOvercrowdedRule(cell, population) {
    return aliveNeighbours(cell, population).length > 3;
}

function isAlive(population, cell) {
    return population.some(_.partial(_.isEqual, cell));
}

function neighbours(cell) {
    return _(selfProduct([-1, 0, 1]))
        .reject(_.partial(_.isEqual, [0, 0]))
        .map(d => ({x: cell.x + d[0], y: cell.y + d[1]}))
        .value();
}

function aliveNeighbours(cell, population) {
    return _.intersectionWith(neighbours(cell), population, _.isEqual);
}

function observableDeadField(population) {
    return _(population)
        .flatMap(neighbours)
        .reject(_.partial(isAlive, population))
        .uniqWith(_.isEqual)
        .value();
}