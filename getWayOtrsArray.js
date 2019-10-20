"use strict";

const pointsFromOtrArray = require("./pointsFromOtrArray");
const deleteDublicatePoints = require("./deleteDublicatePoints");
const vertexDictionary = require("./vertexDictionary");
const getUarr = require("./getUarr");
const getResultPointsArray = require("./getResultPointsArray");

module.exports = function(bodyObject) {
    let waysArr = bodyObject.waysArr;
    let pointA = bodyObject.pointA;
    let pointB = bodyObject.pointB;

    let points = undefined;
    points = pointsFromOtrArray(waysArr);
    points.push(pointA);
    points.push(pointB);
    points = deleteDublicatePoints(points);

    let dictionary = undefined;
    dictionary = vertexDictionary(points);
    dictionary = JSON.parse(JSON.stringify(dictionary));

    const UUU = getUarr(dictionary, waysArr);

    const X = dictionary;
    const U = UUU;
    const rootX = "point" + "***" + parseInt(pointA.Px) + "***" + parseInt(pointA.Py);
    const finishX = "point" + "***" + parseInt(pointB.Px) + "***" + parseInt(pointB.Py);

    const resultArray = getResultPointsArray(
        JSON.parse(JSON.stringify(X)), 
        JSON.parse(JSON.stringify(U)), 
        rootX.toString(),
        finishX.toString()
    );

    resultArray.reverse();

    return resultArray;
}
