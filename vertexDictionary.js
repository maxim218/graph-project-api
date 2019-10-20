"use strict";

module.exports = function(points) {
    const dictionary = {};

    points.forEach((point) => {
        const key = "point" + "***" + point.Px + "***" + point.Py;
        const value = point;
        dictionary[key] = value;
    });

    return dictionary;
}
