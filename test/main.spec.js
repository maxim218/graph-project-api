"use strict";

import assert from 'assert';

const equalFloat = require("./../equalFloat");

const distance = require("./../distance");
const equalPoints = require("./../equalPoints");
const deleteDublicatePoints = require("./../deleteDublicatePoints");
const vertexDictionary = require("./../vertexDictionary");
const pointsFromOtrArray = require("./../pointsFromOtrArray");
const getUarr = require("./../getUarr");
const getResultPointsArray = require("./../getResultPointsArray");

describe("Тестирование функции получения кратчайшего пути", () => {
    it("Прямой порядок следования", () => {
        const X = {
            "p=1=2": 9999999999999,
            "p=3=4": 9999999999999,
            "p=5=6": 9999999999999,
        };

        const rootX = "p=1=2";
        const finishX = "p=3=4";

        const U = [
            {e1: "p=1=2", e2: "p=3=4", d: 2},
            {e1: "p=3=4", e2: "p=5=6", d: 2},
            {e1: "p=5=6", e2: "p=1=2", d: 5,}
        ];

        assert.deepStrictEqual(getResultPointsArray(X, U, rootX, finishX), [
            {Px: 3, Py: 4},
            {Px: 1, Py: 2},
        ]);
    });

    it("Обратный порядок следования", () => {
        const X = {
            "p=1=2": 9999999999999,
            "p=3=4": 9999999999999,
            "p=5=6": 9999999999999,
        };

        const rootX = "p=1=2";
        const finishX = "p=3=4";

        const U = [
            {e2: "p=1=2", e1: "p=3=4", d: 2},
            {e2: "p=3=4", e1: "p=5=6", d: 2},
            {e2: "p=5=6", e1: "p=1=2", d: 5,}
        ];

        assert.deepStrictEqual(getResultPointsArray(X, U, rootX, finishX), [
            {Px: 3, Py: 4},
            {Px: 1, Py: 2},
        ]);
    });

    it("Большое количество вершин, прямой порядок следования", () => {
        const X = {
            "p=10=100": 9999999999999,
            "p=20=100": 9999999999999,
            "p=30=100": 9999999999999,
            "p=40=100": 9999999999999,
            "p=50=100": 9999999999999,
            "p=60=100": 9999999999999,
            "p=70=100": 9999999999999,
            "p=80=100": 9999999999999,
        };

        const rootX = "p=10=100";
        const finishX = "p=80=100";

        const U = [
            {e1: "p=10=100", e2: "p=20=100", d: 10},
            {e1: "p=20=100", e2: "p=30=100", d: 10},
            {e1: "p=30=100", e2: "p=40=100", d: 10},
            {e1: "p=40=100", e2: "p=50=100", d: 10},
            {e1: "p=50=100", e2: "p=60=100", d: 10},
            {e1: "p=60=100", e2: "p=70=100", d: 10},
            {e1: "p=70=100", e2: "p=80=100", d: 10},
        ];

        assert.deepStrictEqual(getResultPointsArray(X, U, rootX, finishX), [
            {Px: 80, Py: 100},
            {Px: 70, Py: 100},
            {Px: 60, Py: 100},
            {Px: 50, Py: 100},
            {Px: 40, Py: 100},
            {Px: 30, Py: 100},
            {Px: 20, Py: 100},
            {Px: 10, Py: 100},
        ]);
    });

    it("Большое количество вершин, обратный порядок следования", () => {
        const X = {
            "p=10=100": 9999999999999,
            "p=20=100": 9999999999999,
            "p=30=100": 9999999999999,
            "p=40=100": 9999999999999,
            "p=50=100": 9999999999999,
            "p=60=100": 9999999999999,
            "p=70=100": 9999999999999,
            "p=80=100": 9999999999999,
        };

        const rootX = "p=10=100";
        const finishX = "p=80=100";

        const U = [
            {e2: "p=10=100", e1: "p=20=100", d: 10},
            {e2: "p=20=100", e1: "p=30=100", d: 10},
            {e2: "p=30=100", e1: "p=40=100", d: 10},
            {e2: "p=40=100", e1: "p=50=100", d: 10},
            {e2: "p=50=100", e1: "p=60=100", d: 10},
            {e2: "p=60=100", e1: "p=70=100", d: 10},
            {e2: "p=70=100", e1: "p=80=100", d: 10},
        ];

        assert.deepStrictEqual(getResultPointsArray(X, U, rootX, finishX), [
            {Px: 80, Py: 100},
            {Px: 70, Py: 100},
            {Px: 60, Py: 100},
            {Px: 50, Py: 100},
            {Px: 40, Py: 100},
            {Px: 30, Py: 100},
            {Px: 20, Py: 100},
            {Px: 10, Py: 100},
        ]);
    });
});

describe("Получение массив ребер из массива отрезков", () => {
    it("В массиве отрезков есть содержимое", () => {
        const dictionary = {
            "point***1***2": {Px: 1, Py: 2},
            "point***3***4": {Px: 3, Py: 4},
            "point***5***6": {Px: 5, Py: 6},
        };

        const waysArr = [
            {
                F: {Px: 1, Py: 2},
                S: {Px: 3, Py: 4},
            },
            {
                F: {Px: 3, Py: 4},
                S: {Px: 5, Py: 6},
            },
            {
                F: {Px: 5, Py: 6},
                S: {Px: 1, Py: 2},
            }
        ];

        assert.deepStrictEqual(getUarr(dictionary, waysArr), [
            {
                e1: "p=1=2",
                e2: "p=3=4",
                d: 2,
            },
            {
                e1: "p=3=4",
                e2: "p=5=6",
                d: 2,
            },
            {
                e1: "p=5=6",
                e2: "p=1=2",
                d: 5,
            }
        ]);
    });
});

describe("Получение вершин из массива отрезков", () => {
    it("Пустой массив отрезков", () => {
        const waysArr = [];
        assert.deepStrictEqual(pointsFromOtrArray(waysArr), []);
    });

    it("Массив отрезков имеет содержимое", () => {
        const waysArr = [
            {
                F: {Px: 1, Py: 2},
                S: {Px: 3, Py: 4},
            },
            {
                F: {Px: 3, Py: 4},
                S: {Px: 5, Py: 6},
            },
            {
                F: {Px: 5, Py: 6},
                S: {Px: 1, Py: 2},
            }
        ];
        assert.deepStrictEqual(pointsFromOtrArray(waysArr), [
            {Px: 1, Py: 2},
            {Px: 3, Py: 4},
            {Px: 3, Py: 4},
            {Px: 5, Py: 6},
            {Px: 5, Py: 6},
            {Px: 1, Py: 2},
        ]);
    });
});

describe("Тестирование функции получения словаря из массива точек", () => {
    it("Пустой массив точек", () => {
        const points = [];
        assert.deepStrictEqual(vertexDictionary(points), {});
    });

    it("Массив точек имеет содержимое", () => {
        const points = [
            {Px: 1, Py: 2},
            {Px: 3, Py: 4},
            {Px: 5, Py: 6},
        ];
        assert.deepStrictEqual(vertexDictionary(points), {
            "point***1***2": {Px: 1, Py: 2},
            "point***3***4": {Px: 3, Py: 4},
            "point***5***6": {Px: 5, Py: 6},
        });
    });
});

describe("Тестирование функции удаления дубликатов", () => {
    it("Есть дубликаты", () => {
        const points = [
            {Px: 20, Py: 123},
            {Px: 20, Py: 123},
            {Px: 20, Py: 123},
            {Px: -456, Py: 71},
            {Px: -456, Py: 71},
            {Px: -456, Py: 71},
        ];
        assert.deepStrictEqual(deleteDublicatePoints(points), [
            {Px: 20, Py: 123},
            {Px: -456, Py: 71},
        ]);
    });

    it("Нет дубликатов", () => {
        const points = [
            {Px: 1234, Py: 5678},
            {Px: -45, Py: -78},
            {Px: 4, Py: 5},
        ];
        assert.deepStrictEqual(deleteDublicatePoints(points), [
            {Px: 1234, Py: 5678},
            {Px: -45, Py: -78},
            {Px: 4, Py: 5},
        ]);
    });

    it("У всех одинаковая позиция X", () => {
        const points = [
            {Px: 2700, Py: 1},
            {Px: 2700, Py: 10},
            {Px: 2700, Py: 100},
            {Px: 2700, Py: 100},
            {Px: 2700, Py: 10},
            {Px: 2700, Py: 1},
        ];
        assert.deepStrictEqual(deleteDublicatePoints(points), [
            {Px: 2700, Py: 1},
            {Px: 2700, Py: 10},
            {Px: 2700, Py: 100},
        ]);
    });

    it("У всех одинаковая позиция Y", () => {
        const points = [
            {Px: 12, Py: 9800},
            {Px: 12, Py: 9800},
            {Px: -34, Py: 9800},
            {Px: -34, Py: 9800},
            {Px: 12, Py: 9800},
            {Px: -34, Py: 9800},
        ];
        assert.deepStrictEqual(deleteDublicatePoints(points), [
            {Px: 12, Py: 9800},
            {Px: -34, Py: 9800},
        ]);
    });
});

describe("Сравнение двух точек друг с другом", () => {
    it("Точки равны", () => {
        const A = {Px: 2, Py: 1};
        const B = {Px: 2, Py: 1};
        assert.deepStrictEqual(equalPoints(A, B), true);
    });

    it("Точки не равны", () => {
        const A = {Px: 22, Py: 18};
        const B = {Px: 2, Py: 1};
        assert.deepStrictEqual(equalPoints(A, B), false);
    });

    it("Точки не равны, одинаковая позиция X", () => {
        const A = {Px: 7500, Py: 34};
        const B = {Px: 7500, Py: 57};
        assert.deepStrictEqual(equalPoints(A, B), false);
    });

    it("Точки не равны, одинаковая позиция Y", () => {
        const A = {Px: 5, Py: 2300};
        const B = {Px: 7, Py: 2300};
        assert.deepStrictEqual(equalPoints(A, B), false);
    });

    it("Точки равны, отрицательные координаты", () => {
        const A = {Px: -25, Py: -123};
        const B = {Px: -25, Py: -123};
        assert.deepStrictEqual(equalPoints(A, B), true);
    });
});

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

