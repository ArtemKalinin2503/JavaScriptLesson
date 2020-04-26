(function () {
    //Замыкание в JavaScript
        function urlGenerator(domain) {
            return function (url) {
                return `http://${url}.${domain}`
            }
        }
        const comUrl = urlGenerator('com');
        console.log(comUrl('google'));
    /*___________________________________*/

    //Async Await (запрос на сервер)
        const url = 'https://jsonplaceholder.typicode.com/posts';
        async function fetchAsyncTodos() {
            console.log("Loading...")
            try {
                const response = await fetch(url);
                const data = await response.json();
                console.log('Data:', data)
            } catch (e) {
                console.error(e);
            }
        }
        fetchAsyncTodos();
    /*___________________________________*/

    //Prototype - Прототипы
        const person = new Object({ //Обычный объект
            name: 'Maxim',
            age: 25,
            greet: function () {
                console.log('Greet')
            }
        });
        console.log(person);
        //Создадим прототип
        Object.prototype.sayHello = function () {
            console.log('Hello!');
        };
        //Создали  объект lena который берет прототип от объекта person
        const lena = Object.create(person);
        console.log(lena);
        lena.name = "Elena" //Перезапишет поле name (идет сверху вниз)
    /*___________________________________*/

    //Испоьзование Prototype для массива
        const arrayNumber = [1, 2, 3, 4, 5];
        Array.prototype.multBy = function (n) { //Array - это прототип в js
            return this.map(function (item) { //this - в данном случае будет массив arrayNumber
                return item * n
            })
        };
        console.log(arrayNumber.multBy(2)); //Тем самым каждый элемент массива умножим на 2
    /*___________________________________*/

    //Работа с контекстом
        const user = {
            name: 'Artem',
            age: 32,
            logInfo: function () {
                console.log(`${this.name}`); //this - будет в рамках объекта user
            }
        };
        user.logInfo();
        const marina = {
            name: 'Marina',
            age: 23
        };
        user.logInfo.bind(marina)(); //Так можно преобределить контекст this
    /*___________________________________*/

    //Promise (смысл такой каждый promise что то делает и возвращает результат в resolve. а далее then принимает эти данные дальше по цепочки)
        const p = new Promise((resolve, reject) =>{
            setTimeout(()=>{
                console.log('Preparind Data...');
                const backendData = {
                    server: 'aws',
                    port: 2000,
                    status: 'working'
                }
                resolve(backendData) //В resolve передаем результат работы Promise
            }, 2000)
        });
            p.then(data => { //В data сейчас пришло то что передали в resolve (то есть backendData)
                console.log(data);
                return new Promise((resolve, reject) => { //Дальше пишем цепочку в resolve будем передать уже изменные данные
                    setTimeout(() => {
                        data.modified = true
                        resolve(data) //Изменили объект backendData который пришел в этот промис с названием data и с помощью resolve передаем дальше
                    }, 2000)
                })
            })
            .then(data => {
                console.log(data); //Вывели уже изменные данные прокинутые выше из resolve
            })
            .catch(err => console.log('Error ', err)); //Catch выводит ошибку если она есть
    /*___________________________________*/

    //Getters and Setters (При такой реализации объекта доступно get и set)
        const objPerson = Object.create (
            {},
            {
                name: {
                    value: 'Artem',
                },
                birthYear: {
                    value: 1988
                },
                age: {
                    //Get - может изменять любое свойство объекта
                    get() {
                        return new Date().getFullYear() - this.birthYear;
                    },
                    //Set - сработает в случае выполнения get (то есть если изменить свойство birthYear например objPerson.birthYear = 100)
                    set(value) { //В value прейдет новое значение age
                        document.body.style.background = 'red';
                        console.log(value);
                    }
                }
            },
        );
    /*___________________________________*/

    //Class в JavaScript
        class Animal { //В классе описываем поля объекта
            constructor(option) {
                this.name = option.name
                this.age = option.age
                this.hasTail = option.hasTail
            }
            //Метод - (так создаеться методы в классе)
            voice() {
                console.log('I am Animal')
            }
        }
        const animal = new Animal({ //Создание объекта как экземпляр класса
            name: 'Animal',
            age: 5,
            hasTail: true
        })
        console.log(animal);

        class Cat extends Animal { //С помощью extends происходит наследование от класса Animal
            constructor(option) {
                super(option); //Если нужно в объект который наследуется от класса Animal, задать новое свойство используем метод "super"
                this.color = option.color;
            }
            //Метод
            voice() {
                super.voice(); //С помощью метода super передадим метод voice от родителя, а потом уже отработает данные метод voice (наслденика класса Animal  )
                console.log('I am Cat')
            }
            //Get - создание геттера (функция которая берет данные из объекта и делает с ними что-то)
            get ageInfo() {
                return this.age * 7;
            }
            //Set - отработает после get ageInfo, а в newAge придет результат отработки get ageInfo
            set ageInfo(newAge) {
                this.age = newAge
            }
        }
        const cat = new Cat({
            name: 'Cat',
            age: 7,
            hasTail: true,
            color: 'black'
        })
        console.log(cat);
        console.log(cat.voice());
        console.log(cat.ageInfo);
    /*___________________________________*/




}());