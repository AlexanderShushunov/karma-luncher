"use strict";

const Filed = require("../src/field");

describe("Field", function () {
	beforeEach(function () {

	});

	afterEach(function () {

	});

	it("should returns all cells", function () {
		let field = new Filed(10,10);
		expect(field.getAllCells().length).toBe(100);
	});
});
