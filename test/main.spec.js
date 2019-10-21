"use strict";

import assert from 'assert';

const equalFloat = require("./../equalFloat");

const distance = require("./../distance");

describe("Получение расстояния между точками", () => {
    it("Горизонтальный отрезок", () => {
        const A = {Px: 2, Py: 1};
        const B = {Px: 5, Py: 1};
        const d = distance(A, B);
        assert.deepStrictEqual(equalFloat(d, 3.0), true);
    });

    it("Вертикальный отрезок", () => {
        const A = {Px: 2, Py: 1};
        const B = {Px: 2, Py: 5};
        const d = distance(A, B);
        assert.deepStrictEqual(equalFloat(d, 4.0), true);
    });

    it("Отрезок под наклоном", () => {
        const A = {Px: 2, Py: 1};
        const B = {Px: 5, Py: 4};
        const d = distance(A, B);
        assert.deepStrictEqual(equalFloat(d, 4.24264), true);
    });
});

