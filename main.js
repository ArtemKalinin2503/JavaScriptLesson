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

    //Функции Генераторы
        function* numberGen(n = 10) { //Функция генератор создаеться при помощи *
            for (let i = 0; i < n; i++) {
                yield i //yield - это поочередное выполнение функции
            }
        }
        const num = numberGen(8);
        console.log(num.next()); //При каждом вызове функции при помощи next() - будет выполняться yield
        console.log(num.next()); //Когда в yield придет последние данные, функция отдаст done: true

    /*___________________________________*/

    //Работа с массивами
        const people = [
            { name: 'Владилен', age: 17, budget: 40000 },
            { name: 'Игорь', age: 46, budget: 45000 },
            { name: 'Елена', age: 15, budget: 20000 },
            { name: 'Максим', age: 32, budget: 30000 },
            { name: 'Дмитрий', age: 28, budget: 1000 },
            { name: 'Алексей', age: 26, budget: 2000 }
        ]
        //Цикл for of (в person придет каждый элемент массива)
        for (let person of people) {
            console.log(person)
        }

        //Цикл forEach (в person придет каждый элемент массива)
        people.forEach(person => {
            console.log(person)
        })

        //Цикл map (в person придет каждый элемент массива)
        const newPeople = people.map(person => {
            return person.name
        })
        console.log(newPeople);

        //Вывод нескольких строк в в цикле map
        const newPeople2 = people.map(person => `${person.name} - ${person.age}`)
        console.log(newPeople2);

        //Filter
        const adults = people.filter(person => person.age >= 18) //Отфильтруем массив от людей которым не 18
        console.log(adults);

        //Reduce
        const amount = people.reduce((total, person) => total + person.budget, 0); //Посчтиаем общий бюджет (0 - это с какого элемента массива начать)
        console.log(amount);

        //FindIndex
        const igorIndex = people.findIndex(person => person.name === 'Игорь') //Найдет index по условию
        console.log(igorIndex);

        //Find
        const igor = people.find(person => person.name === 'Игорь') //Отфильтруем массив people по имени пользователя
        console.log(igor);

        //Групповое использлвание различных циклов
        const amount2 = people
            .filter(person => person.budget > 3000)
            .map(person => {
                return {
                    info: `${person.name} - ${person.age}`,
                    budget: person.budget
                }
            })
            .reduce((total, person) => total + person.budget, 0)
        console.log(amount2);
    /*___________________________________*/

    //Map - карта в JavaScript (позврляет работать с объектами)
        const entries = [
            ['name', 'Vladilen'],
            ['age', 25],
            ['job', 'FullStack']
        ]
        const map = new Map(entries); //Создание карты
            map
            .set('newField', 42); //С помощью метода set - создаем новый элемент объекта в карте
        map.delete('age'); //Удаление из карты значения
        for (let [key, value] of map) { //Перебор карты и получение данных из нее
            console.log(key, value);
        }
        console.log(map.get('newField')); //Через метод get выводим данные из карты
        console.log(map.has('age')); //Проверка на наличие значения в карте
        console.log(map.size); //Узнать размер карты

        //Пример использования
        const users = [
            {name: 'Elena'},
            {name: 'Alex'},
            {name: 'Irina'}
        ]
        //Создали карту
        const visits = new Map()
            .set(users[0], new Date()) //С помощью метода set создали новые ключи в объекте users
            .set(users[1], new Date(new Date().getTime() + 1000 * 60))
            .set(users[2], new Date(new Date().getTime() + 5000 * 60))
        //Данная функция будет получать данные о приходе usera
        function lastVisit(user) {
            return visits.get(user) //С помощью метода get - получаем данные
        }
        console.log(lastVisit(users[2]));
    /*___________________________________*/

    //Set в JavaScript (позволяют работать с массивами данных)
        const set = new Set([1, 2, 3, 3, 3, 4, 5, 5, 6])
        set.add(10) //С помощью метода add можно добавлять данные в массив
        set.delete(1) //Метод delete - удаляет элемент из массива
        console.log(set); //В set - прийдут только уникальные данные без повторов
        console.log(set.has(4)); //Метод gas проверяет если такой элемент в массиве
        console.log(set.size) //Метод size - покажет длину массива
        set.clear() //Метод clear - удаляет все данные из массива
        //Перебор set
        for (let key of set) {
            console.log(key); //Получим каждый элемент массива set
        }

        //Пример
        function uniqValues(array) { //Функция отфильтрует переданный массив и оставит только уникальные данные
            return Array.from(new Set(array))
        }
        console.log(uniqValues([1, 1, 2, 2, 4, 4, 4, 4, 5, 6, 6, 6]));
    /*___________________________________*/

    //XHR Request
        const requestURL = 'https://jsonplaceholder.typicode.com/users';
        //Ajax с Promise
        //GET
        function sendRequestGet(method, url) {
            return new Promise((resolve, reject) => { //resolve - когда все выполнилось хорошо, reject - когда есть ошибки
                const xhr = new XMLHttpRequest()
                xhr.open(method, url)
                xhr.responseType = 'json'
                xhr.onload = () => {
                    if (xhr.status >= 400) { //Если ошибка
                        reject(xhr.response)
                    } else { //Если все удачно и данные пришли
                        resolve(xhr.response);
                    }
                }
                //Обработка ошибки
                xhr.onerror = () => {
                    reject(xhr.response);
                }
                xhr.send()
            })
        }
        sendRequestGet('GET', requestURL) //В data приходит ответ (то есть resolve)
            .then(data => console.log(data))
            .catch(err => console.log(err)) //Если ошибка (то есть reject)
        //POST
        function sendRequestPost(method, url, body) {
            return new Promise((resolve, reject) => { //resolve - когда все выполнилось хорошо, reject - когда есть ошибки
                const xhr = new XMLHttpRequest()
                xhr.open(method, url)
                xhr.responseType = 'json'
                xhr.setRequestHeader('Content-Type','application/json')
                xhr.onload = () => {
                    if (xhr.status >= 400) { //Если ошибка
                        reject(xhr.response)
                    } else { //Если все удачно и данные пришли
                        resolve(xhr.response);
                    }
                }
                //Обработка ошибки
                xhr.onerror = () => {
                    reject(xhr.response);
                }
                xhr.send(JSON.stringify(body))
            })
        }
        sendRequestPost('POST', requestURL, {name: 'Vladilen', age: 26}) //Передача параметров для POST запроса
            .then(data => console.log(data)) //В data приходит ответ (то есть resolve)
            .catch(err => console.log(err)) //Если ошибка (то есть reject)
    /*___________________________________*/

    //Fetch
        const requestURL2 = 'https://jsonplaceholder.typicode.com/users';
        //GET
        function sendRequestFetchGet(method, url) {
            return fetch(url).then(response => {
                return response.json()
            })
        }
        sendRequestFetchGet('GET', requestURL2)
            .then(data => console.log(data))
            .catch(err => console.log(err))
        //POST
        function sendRequestFetchGPost(method, url, body = null) {
            const headers = {
                'Content-Type' : 'application/json'
            }
            return fetch(url, {
                method: method,
                body: JSON.stringify(body),
                headers: headers
            }).then(response => {
                if (response.ok) {
                    return response.json()
                }
                return  response.json().then(error => {
                    const e = new Error('Что-то пошло не так')
                    e.data = error
                    throw e
                })
            })
        }
        sendRequestFetchGPost('POST', requestURL2,{name: 'Artem', age: 26} )
            .then(data => console.log(data))
            .catch(err => console.log(err))
    /*___________________________________*/

    //Spread оператор (разварачивает массив)
        const citiesRussia = ['Москва', 'Тверь', 'Казань', 'Новосибирск'];
        const citiesEurope = ['Берлин', 'Прага', 'Париж'];
        const allCities = [...citiesRussia, 'Вашингтон', ...citiesEurope]; //Так записали массив citiesRussia и citiesEurope
        console.log(allCities);

        const citiesRussiaPopulation = {
            Moscow: 20,
            Tver: 8,
            Kazan: 5,
            Novosibirsk: 3
        }

        const citiesEuropaPopulation = {
            Praha: 20,
            Berlin: 8,
            Paris: 5,
        }

        console.log({...citiesRussiaPopulation}) //Так развернули объект
        console.log({...citiesRussiaPopulation, ...citiesEuropaPopulation}) //объединили два объекта

        //Поиск самого большого числа в массиве
        const numberArr = [2, 5, 8, 42, 56];
        console.log(Math.max(...numberArr));

        //Работа с dom деревом
        const divs = document.querySelectorAll('div');
        const nods = [...divs]; //Так можно получить массив элементов не коллекцию, а массив для работы как с массивом
    /*___________________________________*/

    //Rest оператор
        function sum(a, b, ...rest) {
            return a + b + rest.reduce((a, i) => a + i, 0)
        }
        const numbers2 = [1, 2, 5, 8];
        console.log(sum(...numbers2)); //Получим сумму всех числ в массиве
    /*___________________________________*/

    //Деструктуризация
        //Для работы с массивом
        function calcValues(a, b) {
            return [
                a + b,
                a - b,
                a * b,
                a / b
            ]
        }
        const [resultOne, resultTwo] = calcValues(42,10); //Функция будет выполнять условия и складывать все в массив
        console.log(resultOne, resultTwo); //Каждая переменная это результат одной операции по порядку (если на пропусть одну операцию просто указываем зяпятую , )

        //Для работы с Object
        const personDest = {
            name: 'Max',
            age: 20,
            address: {
                country: 'Russia',
                city: 'Moscow'
            }
        }
        const {name, age: agePerson, address: {country, city}} = personDest; //Получение данных из объекта + переопределение названия ключа
        console.log(name, agePerson, country, city);

        //Работа с функциями
        function logPerson({name, age}) {
            console.log(name + ' ' + age)
        }
        logPerson(personDest);
    /*___________________________________*/

    //LocalStorage (работает только со строками и возвращает только строки)
        const myNumber = 42;
        localStorage.setItem('number', myNumber.toString()); //Метод setItem - записыает данные в localStorage
        localStorage.getItem('number'); //Метод getItem - возвращает из localStorage данные
        localStorage.removeItem('number'); //Метод removeItem - удаляет переаданные данные из localStorage
        localStorage.clear(); //Удаляет все записи в localStorage

        //Работа с объектами
        const objectStorage = {
            name: 'Max',
            age: 20
        }
        localStorage.setItem('person', JSON.stringify(objectStorage)); //Записали объект в localStorage
        const raw = localStorage.getItem('person'); //Получение данных (но нужно использовать JSON.parse)
        const resultLocal = JSON.parse(raw);
        console.log(resultLocal);
        resultLocal.name = 'Vladilen'; //Так можно перезаписать объект в localStorage
        console.log(resultLocal);

        //Отслеживание изменений в localStorage если приложение открыто в разных вкладках (отрабатывает при каждом изменение localStorage)
        window.addEventListener('storage', event => {
            console.log(event);
        });
    /*___________________________________*/


}());