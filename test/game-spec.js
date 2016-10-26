"use strict";
const _ = require("lodash");
require("jasmine-collection-matchers");

const {step, _forTest : {isAlive, observableDeadField, neighbours}} = require("../src/game");
const {c} = require("../src/helpers");

describe("Game", function () {
    it("step should birth new cell if 3 neighbours exists", function () {
        expect(isAlive(step([c(0, 0), c(0, 1), c(0, 2)]), c(1, 1))).toBeTruthy();
        expect(isAlive(step([c(0, 0), c(1, 0), c(0, 1)]), c(1, 1))).toBeTruthy();
        expect(isAlive(step([c(0, 0), c(2, 2), c(2, 0)]), c(1, 1))).toBeTruthy();
    });

    it("step should not birth new cell if only 2 neighbours exists", function () {
        expect(isAlive(step([c(0, 0), c(0, 1)]), c(1, 1))).toBeFalsy();
        expect(isAlive(step([c(0, 0), c(0, 1)]), c(1, 1))).toBeFalsy();
        expect(isAlive(step([c(0, 0), c(2, 2)]), c(1, 1))).toBeFalsy();
    });

    it("step should not birth new cell if more than 3 neighbours exists", function () {
        expect(isAlive(step([c(0, 0), c(0, 1), c(0, 2), c(1, 0)]), c(1, 1))).toBeFalsy();
        expect(isAlive(step([c(0, 0), c(1, 0), c(0, 1), c(2, 2)]), c(1, 1))).toBeFalsy();
        expect(isAlive(step([c(0, 0), c(2, 2), c(2, 0), c(0, 2)]), c(1, 1))).toBeFalsy();
    });

    it("step should kill cell if it has less than 2 neighbours", function () {
        expect(isAlive(step([c(0, 0), c(0, 1), c(0, 3)]), c(0, 0))).toBeFalsy();
        expect(isAlive(step([c(0, 0), c(0, 1), c(0, 3)]), c(0, 1))).toBeFalsy();
        expect(isAlive(step([c(0, 0), c(0, 1), c(0, 3)]), c(0, 3))).toBeFalsy();
        expect(isAlive(step([c(0, 0), c(1, 1), c(2, 2)]), c(0, 0))).toBeFalsy();
        expect(isAlive(step([c(0, 0), c(1, 1), c(2, 2)]), c(2, 2))).toBeFalsy();
    });

    it("step should keep alive cell if it has 2 neighbours", function () {
        expect(isAlive(step([c(0, 0), c(0, 1), c(0, 2)]), c(0, 1))).toBeTruthy();
        expect(isAlive(step([c(0, 0), c(1, 1), c(2, 2)]), c(1, 1))).toBeTruthy();
        expect(isAlive(step([c(5, 3), c(7, 3), c(6, 4)]), c(6, 4))).toBeTruthy();
    });

    it("step should keep alive cell if it has 3 neighbours", function () {
        expect(isAlive(step([c(0, 0), c(0, 1), c(0, 2), c(1, 1)]), c(0, 1))).toBeTruthy();
        expect(isAlive(step([c(0, 0), c(1, 1), c(2, 2), c(2, 0)]), c(1, 1))).toBeTruthy();
        expect(isAlive(step([c(5, 3), c(7, 3), c(6, 4), c(6, 5)]), c(6, 4))).toBeTruthy();
    });

    it("step should kill cell if it has more than 3 neighbours", function () {
        expect(isAlive(step([
            c(0, 0), c(0, 1), c(0, 2),
            c(0, 1), c(1, 1), c(2, 1),
            c(0, 2), c(1, 2), c(2, 2)
        ]), c(1, 1))).toBeFalsy();
        expect(isAlive(step([
            c(0, 0), c(0, 1),
            c(0, 1), c(1, 1), c(2, 1),
            c(0, 2), c(1, 2), c(2, 2)
        ]), c(1, 1))).toBeFalsy();
        expect(isAlive(step([
            c(0, 0), c(0, 1),
            c(1, 1), c(2, 1),
            c(0, 2), c(1, 2), c(2, 2)
        ]), c(1, 1))).toBeFalsy();
        expect(isAlive(step([
            c(0, 0), c(0, 1),
            c(1, 1), c(2, 1),
            c(0, 2), c(2, 2)
        ]), c(1, 1))).toBeFalsy();
        expect(isAlive(step([
            c(0, 0),
            c(1, 1), c(2, 1),
            c(0, 2), c(2, 2)
        ]), c(1, 1))).toBeFalsy();
    });

    it("observableDeadField should return all dead points of alive points", function () {
        expect(observableDeadField([c(0, 0), c(5, 5), c(5, 4)])).toHaveSameItems([
            c(-1, -1), c(0, -1), c(1, -1),
            c(-1, 0), c(1, 0),
            c(-1, 1), c(0, 1), c(1, 1),
            c(4, 3), c(5, 3), c(6, 3),
            c(4, 4), c(6, 4),
            c(4, 5), c(6, 5),
            c(4, 6), c(5, 6), c(6, 6)], true);
    });

    it("neighbours should return all neighbours of cell", () => {
        expect(neighbours(c(5, 7))).toHaveSameItems([
            c(4, 6), c(5, 6), c(6, 6),
            c(4, 7), c(6, 7),
            c(4, 8), c(5, 8), c(6, 8)], true);
    });
});