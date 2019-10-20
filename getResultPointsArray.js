"use strict";

module.exports = function(X, U, rootX, finishX) {
    const root = {
        name: rootX.toString(),
        parent: null,
        way: 0,
    };

    function isAlreadyInTree(name, parent) {
        let now = parent;
        while(now) {
            if(now.name.toString() === name.toString()) return true;
            now = now.parent;
        }
        return false;
    }

    let minWay = 9999999999999;
    let endElement = root;

    function addChildren(element) {
        element.arr = [];

        U.forEach((Uelem) => {
            if(Uelem.e1 === element.name && isAlreadyInTree(Uelem.e2.toString(), element) === false) {
                element.arr.push({
                    name: Uelem.e2.toString(),
                    parent: element,
                    way: element.way + Uelem.d,
                });
            }

            if(Uelem.e2 === element.name && isAlreadyInTree(Uelem.e1.toString(), element) === false) {
                element.arr.push({
                    name: Uelem.e1.toString(),
                    parent: element,
                    way: element.way + Uelem.d,
                });
            }
        });

        if(element.name.toString() === finishX.toString()) {
           if(minWay > element.way) {
               minWay = element.way;
               endElement = element;
           }
           return;
        }

        element.arr.forEach((child) => {
            addChildren(child);
        });
    }

    addChildren(root);

    const resultArray = [];

    while(endElement) {
        resultArray.push({
            Px: parseInt(endElement.name.toString().split("***")[1]),
            Py: parseInt(endElement.name.toString().split("***")[2]),
        });
        endElement = endElement.parent;
    }

    return resultArray;
}
