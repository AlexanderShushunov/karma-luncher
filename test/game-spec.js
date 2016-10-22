"use strict";
const Game = require("./../src/game");
describe("Game", function () {

	let game;

	beforeEach(() => game = new Game());

	it("should create with life cells", () => expect(game.hasAliveCells()).toBeTruthy());

	it("should return state as a string fiels", () => expect(game.toString()).toMatch(/[*+]+/));

	it("should have cells with any neighbours", () => {
		game = game.born(0, 0);
		expect(game.countAliveNeighbours(0, 1)).toBeGreaterThanOrEqual(1);
	});

});
