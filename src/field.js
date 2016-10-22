const lodash = require("lodash");
const Cell = require("./cell");

module.exports = class Field {
	constructor(w,h) {
		this.cells = [];
		lodash.times(10,  () => this.cell.push([]));
		for (var i =0; i < w; i ++) {
			this.cells[i] = [];
			for (var j = 0; j < h; j ++) {
				this.cells[i].push(new Cell());
			}
		}
	}

	getAllCells() {
		return lodash.concat(... this.cells);
	}
};