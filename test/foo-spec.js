"use strict";
const {birth, isAlive, kill, step} = require("../src/foo");
describe("Foo", function () {
	it("birth should add alive cell ", function () {
		expect(isAlive(birth([], 0, 0), 0, 0)).toBeTruthy();
	});

	it("kill should remove cell ", function () {
		expect(isAlive(kill(birth([], 0, 0), 0, 0), 0, 0)).toBeFalsy();
	});

	it("should birth new cell if 3 neighbours exists", function () {
		let addLine = game => birth(birth(birth(game, 0, 0), 0, 1), 0, 2);
		expect(isAlive(step(addLine([])), 1, 1)).toBeTruthy();
	});

});