// Домашнее задание(Порешать типовые задачи - написать порядок и вывод в консоли):
// 1)
// console.log('1');
// setTimeout(() => console.log('2'), 1);
// let promiseNew = new Promise((resolve) => {
//     console.log('3');
//     resolve();
// });
// promiseNew.then(() => console.log('4'));
// setTimeout(() => console.log('5'));
// console.log('6');
// Ответ: 1, 3, 6, 4, 2, 5. Сначала выполняется синхронный код (1, 3, 6), т.к. тело промиса тоже относится к синхронному
// коду. Далее когда callStack пустеет, выполняются все имеющиеся микрозадачи, здесь она только одна - обработчик
// промиса then (4). Далее выполняется одна макрозадача, выполняется рендеринг, проверяется, что очередь макро- и
// микрозадач пустые и выполняется следующая макрозадача. По идее сначала в консоль должна попадать 5, а потом 2, но
// видимо задержки в 1 секунду недостаточно
//////////////////////////////
// 2)
// let promiseTree = new Promise((resolve, reject) => {
//     resolve("a");
//     console.log("1");
//     setTimeout(() => {
//         console.log("2");
//     }, 0);
//     console.log("3");
// });
// Ответ: 1, 3, 2. Т.к. сначала выполняется синхронный код - тело промиса (1,3), а затем макротаска
/////////////////////////
// 3)
// let promiseTwo = new Promise((resolve, reject) => {
//     resolve("a");
// });
// promiseTwo
//     .then((res) => {
//         return res + "b";
//     })
//     .then((res) => {
//         return res + "с";
//     })
//     .finally((res) => {
//         return res + "!!!!!!!";
//     })
//     .catch((res) => {
//         return res + "d";
//     })
//     .then((res) => {
//         console.log(res);
//     });
// Ответ: abc. Т.к. finally ничего не может ничего принимать в качестве аргумента. Catch не отработает поскольку в
// промисе вызван метод resolve
/////////////////////////////
// 4)
// function doSmth() {
//     return Promise.resolve("123");
// }
// doSmth()
//     .then(function (a) {
//         console.log("1", a);
//         return a;
//     })
//     .then(function (b) {
//         console.log("2", b);
//         return Promise.reject("321");
//     })
//     .catch(function (err) {
//         console.log("3", err);
//     })
//     .then(function (c) {
//         console.log("4", c);
//         return c;
//     });
// Ответ: 1 123, 2 123, 3 321, 4 undefined. На 66 строке выведется 321, поскольку промис перешел в состояние rejected,
// а на 69 - 4 undefined потому что в catch мы ничего не возвращаем
///////////////////////////
// 5)
// console.log("1");
// setTimeout(function () {
//     console.log("2");
// }, 0);
// Promise.resolve().then(() => console.log("3"));
// console.log("4");
// Ответ: 1, 4, 3, 2. Синхронный код => очередь микрозадач => макрозадача
////////////////////////////
// 7)
// async function a() {
//   console.log("a");
// }
//
// console.log("1");
//
// (async function () {
//   console.log("f1");
//   await a();
//   console.log("f2");
// })();
// console.log("2");
// Ответ: 1, f1, a, 2, f2, т.к. IIFE является синхронным кодом, поэтому после 1 будет f1, далее интерпретатор ждет
// завершения промиса нас строке 93, который завершается мгновенно и выводится а. Вывод f2 расположен ниже await и
// поэтому относится к обработчику промиса, т.е. является микротаской, которая выполнится после выполнения всего
// синхронного кода
////////////////////////////////
//8)
// console.log(1);
//
// setTimeout(() => console.log(2));
//
// async function func() {
//   console.log(3);
//
//   await new Promise((resolve) => {
//     console.log(4);
//     resolve();
//     console.log(5);
//   })
//     .then(() => console.log(6))
//     .then(() => console.log(7));
//
//   console.log(8);
// }
//
// setTimeout(() => console.log(9));
//
// func();
//
// console.log(10);
// Ответ: 1, 3, 4, 5, 10, 6, 7, 8, 2, 9 Потому что async функция как и тело промиса выполняется синхронно, до первого
// await или then соответственно. После завершения выполнения синхронного кода (1, 3, 4, 5, 10) выполняются все
// микротаски и далее две макротаски по очереди
///////////////////////////////////
// 9)*
// function foo(callback) {
//     setTimeout(() => {
//         callback('A');
//     }, Math.random() * 100);
// }
// function bar(callback) {
//     setTimeout(() => {
//         callback('B');
//     }, Math.random() * 100);
// }
// function baz(callback) {
//     setTimeout(() => {
//         callback('C');
//     }, Math.random() * 100);
// }

// foo(console.log)
// bar(console.log)
// baz(console.log)


// const promise = (fn) => new Promise(resolve => fn(resolve)).then(str => console.log(str))
//
// async function getABC() {
//     await promise(foo);
//     await promise(bar);
//     await promise(baz);
// }
//
// getABC();

// Написать функцию, чтобы починить последовательность выполнения A,B,C без использования колбэк хэлла
// в функциях foo, bar,baz запрещено что-либо менять
// подсказка: нужны промисы =))

///////////////
// todo Объяснить код, рассказать какие консоли и в какой последовательности будут, а затем переписать его на промисы
// function resolveAfter2Seconds(x) {
//     console.log(`Какой Х пришёл -> ${x}`)
//     return new Promise(resolve => {
//         setTimeout(() => {
//             resolve(x); //
//         }, 5000);
//     });
// }
// async function add1(x) {
//     console.log('add1 Hello')
//     const a = await resolveAfter2Seconds(20);
//     const b = await resolveAfter2Seconds(30);
//     console.log('add1 Bye')
//     return x + a + b;
// }
// add1(10).then(console.log);

// Ответ: add1 Hello, Какой Х пришёл -> 20, Какой Х пришёл -> 30, add1 Bye, 60
// Функция с ключевым словом async выполняется как синхронный код до первого await, далее ожидается завершение
// выполнения первого await, код ниже await продолжит выполняться, когда завершится выполнение остального синхронного
// кода вне тела функции. По сути код ниже await находится в then, то есть является микрозадачей. Поэтому сначала мы
// видим add1 Hello, затем Какой Х пришёл -> 20. В переменную a попадает промис, и так как метод resolve находится
// внутри setTimeout, то await ждет 5 с и в переменную a попадает число 20. Т.к. вне add1 больше нет синхронного
// кода, event loop переходит к выполнению следующего await, который для первого await является микрозадачей,
// поэтому мы увидиим Какой Х пришёл -> 30 (с задержкой 5 с). После второго await опять должен выполняться синхронный
// код, но т.к. его нет, то выведется add1 Bye (с задержкой 5 с), а также add1 возвращает 50.
