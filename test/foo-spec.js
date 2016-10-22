"use strict";
const {foo, boo} = require("../src/foo");
describe("Foo", function () {
	beforeEach(function () {

	});

	afterEach(function () {

	});

	it("should ", function () {
		expect(foo()).toBe("4.16.4");
	});

	it("should ", function () {
		expect(boo()).toBe(3);
	});
});
