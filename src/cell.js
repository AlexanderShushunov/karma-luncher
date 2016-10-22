module.exports = class Cell {
	constructor() {
		this._isAlive = true;
	}

	isAlive() {
		return this._isAlive;
	}

	kill() {
		this._isAlive = false;
	}
};