"use strict";
const _ = require("lodash");

module.exports =
{
	foo() {
		return _.VERSION;
	},
	boo() {
		let {b} = {a: 2, b: 3};
		return b;
	}
};