"use strict";
const Cell = require("../src/cell");

describe("Cell", function () {
	it("should be alive after creating ", function () {
		let cell = new Cell();
		expect(cell.isAlive()).toBeTruthy();
	});

	it("should be dead after killing", function () {
		let cell = new Cell();
		cell.kill();
		expect(cell.isAlive()).toBeFalsy();
	});
});
