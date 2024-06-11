// // //1
// const user = {
//     name: 'Bob',
//     funcFunc() {
//         return function() {
//             console.log(this);
//         }
//     },
//     funcArrow() {
//         return () => {
//             console.log(this);
//         }
//     },
//     arrowFunc: () => {
//         return function() {
//             console.log(this);
//         }
//     },
//     arrowArrow: () => {
//         return () => {
//             console.log(this);
//         }
//     },
// };
//
// user.funcFunc()(); // В браузере глобальный объект window, в NodeJS объект global
// user.funcArrow()(); // В браузере и NodeJS объект user, поскольку у стрелочных функций лексический контекст, т.е. их
// this зависит от контекста, где они были вызваны. This берется из ближайшего контекста выполнения. Т.е. стрелочная
// функция использует this метода funcArrow
// user.arrowFunc()(); // В браузере глобальный объект window, в NodeJS объект global, т.к. вызываемая функция
// использует this стрелочной функции, у которой this ссылается на вышестоящий контекст выполнения, т.е. глобальный
// объект
// user.arrowArrow()(); //В браузере глобальный объект window, в NodeJs {}

// 2
// var poke1 = {name:'Pikachu'};
// var poke2 = {name:'Chermander'};
// var poke3 = {name:'Bulbasaur'};
//
// var sayName = function(){ console.log(this.name) }
//
// sayName.bind(poke1).bind(poke2).call(poke3); // Pikachu - поскольку методом bind устанавливается poke1 в качестве
// контекста функции sayName. Второй метод bind игнорируется. Вызов функции происходит с помощью метода call, bind
// функцию не вызывает, а возвращают новую функию со значением this, который равен первому аргументу функции bind.
// вызов call не меняет this функции sayName, а только вызывает функцию sayName с уже установленным this как poke1

// 3
// const obj = {
//     firstName: 'Bill',
//     lastName: 'Ivanov',
//
//     showFirstName: function () {
//         console.log(this.firstName);
//     },
//
//     showLastName: () => {
//         console.log(this.lastName);
//     }
// }

// obj.showFirstName(); // Bill - потому что this здесь - это объект до точки, т.е. obj
// obj.showLastName(); // undefined - из-за того, что showLastName стрелочная функция, а у стрелочных функций this
// // указывает на вышестоящий контекст выполнения, т.е. по сути вызывается console.log(window.lastName) или
// // console.log(global.lastName), а у этих объектов нет свойства lastName
//
// obj.showFirstName.bind({ firstName: 'Boris' })(); // Boris - потому что мы вызываем новую функцию, возвращаемую bind, у
// // которой this указывает на объект, переданный в первый аргумент bind
//
// obj.showFirstName.bind({ firstName: 'Boris' }).bind({ firstName: 'Oleg' })(); // Boris - всё, как в предыдущем случае
// // поскольку второй bind игнорируется
//
// obj.showLastName.bind({ lastName: 'Boris' })(); // Undefined, поскольку для стрелочных функций нельзя переопределить
// // this, оно всегда будет определяться контекстом выполнения

// 4

/*const user = {
    name: 'Mike',
    fn: function () {
        console.log(this.name)
    }
}

const fn = user.fn.bind(user);

setTimeout(fn, 1000);*/

// Что будет выведено в консоль после истечения таймаута и почему?
// Будет выведено undefined. Потому что при передаче метода отдельно от объекта происходит потеря контекста.

// Сделайте так, чтоб починить и выводило "Mike"
// Для этого можно привязать контектс с помощью метода bind.
// Подсказка - ответ найдете в 5 ссылке README

// 5
//Исправьте cтроку(***), чтобы всё работало (других строк изменять не надо, кроме password, чтобы проверить if else).
// Как и в предыдущем случае, необходимо каждому методу, взятому из объекта user, указать контекст, иначе произойдет его
// потеря. Сделать это возможно с помощью метода bind, потому что он возвращает привязанную функцию, this которой
// установлен как первый аргумент метода bind. Также для предотвращения потери контекста возможно использовать функции
// обертки, благодаря чему объект user замыкается внутри таких функций.
// function askPassword(ok, fail) {
//   let password = 'rockstar2'
//   if (password == "rockstar") ok();
//   else fail();
// }
//
// let user = {
//   name: 'Вася',
//
//   loginOk() {
//     console.log(`${this.name} logged in`);
//   },
//
//   loginFail() {
//     console.log(`${this.name} failed to log in`);
//   },
//
// };
//
// askPassword(user.loginOk.bind(user), user.loginFail.bind(user)) //***;
// askPassword(() => user.loginOk(), () => user.loginFail()) //***;



