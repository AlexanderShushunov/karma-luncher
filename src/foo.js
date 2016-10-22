"use strict";
const _ = require("lodash");

module.exports = {

	birth(game, x, y) {
		return _.concat(game, {x, y});
	},

	isAlive(game, x, y) {
		return game.some(_.curry(_.isEqual)(_, {x, y}));
	},

	kill(game, x, y) {
		return _.filter(game, _.negate(_.curry(_.isEqual)({x, y})));
	},

	step(game) {
		return game;
	}
};