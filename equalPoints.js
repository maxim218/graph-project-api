"use strict";

module.exports = function(A, B) {
    if(parseInt(A.Px) !== parseInt(B.Px)) return false;
    if(parseInt(A.Py) !== parseInt(B.Py)) return false;
    return true;
}
