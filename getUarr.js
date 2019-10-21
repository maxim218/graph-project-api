"use strict";

const distance = require("./distance");

module.exports = function(dictionary, waysArr) {
    const UUU = [];

    waysArr.forEach((otr) => {
        const F = otr.F;
        const S = otr.S;

        let keyF = "point" + "***" + parseInt(F.Px) + "***" + parseInt(F.Py);
        let keyS = "point" + "***" + parseInt(S.Px) + "***" + parseInt(S.Py);

        let distanceFS = distance(dictionary[keyF], dictionary[keyS]);
        distanceFS = parseInt(distanceFS);

        keyF = "p" + "=" + parseInt(F.Px) + "=" + parseInt(F.Py);
        keyS = "p" + "=" + parseInt(S.Px) + "=" + parseInt(S.Py);

        UUU.push({
            e1: keyF.toString(),
            e2: keyS.toString(),
            d: distanceFS,
        });
    });

    return UUU;
}
