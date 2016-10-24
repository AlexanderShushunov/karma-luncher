"use strict";
const _ = require("lodash");
const selfProduct = arr => require('cartesian-product')([arr, arr]);

module.exports = {
	step,
	observableField,
	neighbours,
	isAlive: (population, x, y) => population.some(_.curry(_.isEqual)(_, {x, y})),
	c: (x, y) => ({x, y})
};

function step(population) {
	return observableField(population).filter(cell => birthRule(cell, population));
}

function birthRule(cell, population) {
	return _.intersectionWith(neighbours(cell), population, _.isEqual).length == 3;
}

function observableField(population) {
	return _(population).flatMap(neighbours).uniqWith(_.isEqual).value();
}

function neighbours(cell) {
	return selfProduct([-1, 0, 1]).map(d => ({x: cell.x + d[0], y: cell.y + d[1]}));
}