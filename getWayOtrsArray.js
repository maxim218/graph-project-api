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

    const U = getUarr(dictionary, waysArr);

    const rootX = "p" + "=" + parseInt(pointA.Px) + "=" + parseInt(pointA.Py);
    const finishX = "p" + "=" + parseInt(pointB.Px) + "=" + parseInt(pointB.Py);

    const X = {};

    for(let key in dictionary) {
        const Px = parseInt(key.split("***")[1]);
        const Py = parseInt(key.split("***")[2]);
        const newKey = "p" + "=" + Px + "=" + Py;
        X[newKey] = 9999999999999;
    };

    console.log("rootX: " + rootX);
    console.log("finishX: " + finishX);
    console.log(JSON.stringify(X, null, 4));
    console.log(JSON.stringify(U, null, 4));

    const resultArray = getResultPointsArray(
        JSON.parse(JSON.stringify(X)),
        JSON.parse(JSON.stringify(U)), 
        rootX.toString(),
        finishX.toString()
    );

    resultArray.reverse();

    return resultArray;
}
