"use strict";

const equalPoints = require("./equalPoints");

module.exports = function(points) {
    const arr = [];

    points.forEach((point) => {
        let found = false;

        arr.forEach((element) => {
            if(equalPoints(point, element) === true) found = true;
        });

        if(found === false) {
            arr.push(point);
        }
    });

    return arr;
}
