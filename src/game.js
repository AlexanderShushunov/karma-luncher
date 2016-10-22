"use strict";
const _ = require("lodash");
const Immutable = require("immutable");

module.exports = class Game {

	constructor(cells) {
		this.cells = cells || Immutable.Set();
	}

	born(x, y) {
		return new Game(this.cells.add({x, y}));
	}

	countAliveNeighbours(x, y) {
		return this.cells.filter(cell => Math.abs(cell.x - x) <= 1 && Math.abs(cell.y - y) <= 1).size;
	}


	hasAliveCells() {
		return true;
	}

	toString() {
		return "+++***";
	}

}