"use strict";
const _ = require("lodash");
const {step} = require("./game");
const {c} = require("./helpers");

let population = [
            c(1, 0),
    c(0, 1),
    c(0, 2), c(1, 2), c(2, 2)];


_.times(5, () => {
    printGame(population);
    population = step(population);
});

function printGame(population) {
    let result = "";
    let fieldDimension = {
        top: -1,
        left: -2,
        width: 6,
        height: 6
    };

    _.times(fieldDimension.height, printRow);

    function printRow(rowNumber) {
        _.times(fieldDimension.width, _.partial(printCell, rowNumber));
        result += "\n";
    }

    function printCell(yOffset, xOffset) {
        let cell = {
            x: fieldDimension.left + xOffset,
            y: fieldDimension.top + yOffset
        };
        result += cellSign(cell);
    }
    function cellSign(cell) {
        return population.some(_.partial(_.isEqual, cell)) ? "*" : ".";
    }
    console.log(result);
}
