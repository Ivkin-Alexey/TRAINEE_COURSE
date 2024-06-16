//1.
// const a = {b: 1},
//     c = Object.create(a);
//
// console.log(c.b); // 1 Т.к. в качестве прототипа для объекта с установлен объект а
// delete c.b;
// console.log(c.b); // 1 т.к. свойство b будет браться из прототипа
// delete a.b;
// console.log(c.b); // undefined
// a.z = 2;
// console.log(c.z); // 2
// c.z = 3;
// console.log(a.z); // 2 т.к. поиск свойства идет от экземпляра к прототипу, а не наоборот

// 2.

// const promise = new Promise(() => {
// })
// promise.prototype === Promise.__proto__; // false, т.к. prototype есть только у function (кроме стрелочных) и class
//
// const obj = {}
// obj.__proto__ === Object.prototype; // true, т.к. под капотом {} означает запись new Object
//
// new Array([]).__proto__ === Array.prototype; // true
//
// function Fn1 () {}
// function Fn2 () {}
//
// Fn1.constructor === Fn2.constructor; // true посколько constructor это ссылка на функ. - конструктор, исп. для создания данного объекта - new Function
//
// Fn1.prototype === Fn2.prototype; // false хоть это и будут идентичные объекты они будут являтсья независимыми копиями, а значит хранится в памяти по разным ссылкам
//3.

// У вас есть два конструктора, Animal и Bird.
// Каждый объект типа Bird должен наследовать метод speak от Animal.
// Однако, Bird также должен иметь свой собственный метод fly.

// Создайте функцию-конструктор Animal, который принимает параметр name и устанавливает его как свойство объекта.
// Добавьте метод speak в Animal, который выводит в консоль звук, издаваемый животным (например, "Some generic sound").
// Создайте конструктор Bird, который принимает параметр name и вызывает конструктор Animal с тем же именем.
// Добавьте метод fly в Bird, который выводит в консоль сообщение о том, что птица летит (например, "Flying high!").
// Создайте объекты animal и bird с использованием соответствующих конструкторов и вызовите их методы speak и fly.
// Решите задачу, используя прототипное наследование, чтобы Bird наследовал от Animal.

// Должно быть такое поведение:
// function Animal(name) {
//     this.name = name;
// }
//
// Animal.prototype.speak = function() {
//     console.log("Some generic sound");
// }
//
// function Bird(name) {
//     Animal.call(this, name);
// }
//
// Bird.prototype = Object.create(Animal.prototype);
// Bird.prototype.constructor = Bird;
//
// Bird.prototype.fly = function() {
//     console.log("Flying high!");
// }
//
// const animal = new Animal("Дженни");
// const bird = new Bird("Воробей");
//
// animal.speak(); // "Some generic sound"
// bird.speak();   // "Some generic sound"
// bird.fly();     // "Flying high!"





