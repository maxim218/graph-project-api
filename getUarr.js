"use strict";

const distance = require("./distance");

module.exports = function(dictionary, waysArr) {
    const UUU = [];

    waysArr.forEach((otr) => {
        const F = otr.F;
        const S = otr.S;

        const keyF = "point" + "***" + parseInt(F.Px) + "***" + parseInt(F.Py);
        const keyS = "point" + "***" + parseInt(S.Px) + "***" + parseInt(S.Py);

        const distanceFS = distance(dictionary[keyF], dictionary[keyS]);

        UUU.push({
            e1: keyF.toString(),
            e2: keyS.toString(),
            d: distanceFS,
        });

        UUU.push({
            e1: keyS.toString(),
            e2: keyF.toString(),
            d: distanceFS,
        });
    });

    return UUU;
}
