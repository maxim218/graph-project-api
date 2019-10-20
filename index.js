"use strict";

const getWayOtrsArray = require("./getWayOtrsArray");

const express = require("express");
const app = express();
const port = 5005;
app.listen(port);
console.log("Server works on port: " + port);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post("/way/find", function(request, response) {
    const buffer = [];
    request.on('data', (data) => {
        buffer.push(data);
    }).on('end', () => {
        const bodyString = buffer.join("");
        const bodyObject = JSON.parse(bodyString);
        const resultArray = getWayOtrsArray(bodyObject);
        response.end(JSON.stringify({
            arr: resultArray,
        }));
    });
});
