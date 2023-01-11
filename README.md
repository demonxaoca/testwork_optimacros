## Настройки

Все настройки проекта лежат в файле `.env`

`DB_TYPE=file` - Тип БД (`file` | `mongo`)

`DB_FILE=./db/auto.json` - Путь до файла для типа БД = file (файл автоматически не создаётся, его необходимо предварительно создать если файл отсутствует по примеру)

`DB_MONGO=mongodb://127.0.0.1/auto` - Соединение для типа БД = mongo

`BASE_URL=http://127.0.0.1:3000` - Базовый URL приложения для клиента

---

## MongoDB

В случае установки типа БД = mongo

Запустить команду `docker-compose up -d` в корне проекта для локального запуска сервера MondoDB

## Запуск

Сначала в каталоге приложения выполнить `npm install`

- 1 Вариант
    
    Сервер `npm run server`

    Клиент `npm run client {...args}`

- 2 Вариант

    Компилируем командой `npm run compile`

    Копируем файл `.env` в папку `./dest`

    Если указан тип БД `file` то создайте файл БД в соотвтествии с настройкой в `.env` файле

    Переходим в папку `dest` и из этой папки запускаем

    - сервер `node server.js`
    - клиент `node client.js {...args}`

## Структура для модели auto

```TypeScript
Auto = {
    id?: string,
    brand: string,
    name: string,
    year: number,
    price: number,
}
```

## Примеры запуска клиента

- Получить список `npm run client auto/list`
- Сортировка по полю `npm run client auto/list orderBy=year orderType=desc`
- Добавить авто `npm run client auto/add brand=vw name=polo year=2015 price=200000`
- Изменить авто `npm run client auto/edit id=66a0ee2e-8fbc-4c0d-a275-1bade34db2bb year=2010 price=300000`
- Удалить авто `npm run client auto/del id=66a0ee2e-8fbc-4c0d-a275-1bade34db2bb`
