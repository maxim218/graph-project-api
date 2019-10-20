"use strict";

module.exports = function(waysArr) {
    const points = [];

    waysArr.forEach((otr) => {
        points.push(otr.F);
        points.push(otr.S);
    });

    return points;
}