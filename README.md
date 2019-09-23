# fun-box-qt-js

[![Build Status](https://img.shields.io/travis/ezze/fun-box-qt-js/master.svg)](https://travis-ci.org/ezze/fun-box-qt-js)
[![Coverage Status](https://img.shields.io/coveralls/github/ezze/fun-box-qt-js/master.svg)](https://coveralls.io/github/ezze/fun-box-qt-js?branch=master)

Тестовое задание для [Fun-Box](https://fun-box.ru).

Онлайн-демонстрация доступна [здесь](https://ezze.github.io/fun-box-qt-js/).

## Сборка

1. Клонировать репозиторий:

    ```bash
    git clone git@github.com:ezze/fun-box-qt-js /path/to/fun-box-qt-js
    cd /path/to/fun-box-qt-js
    ```

2. Установить зависимости:

    - с помощью [Yarn](https://yarnpkg.com/):

        ```bash
        yarn
        ```
        
    - с помощью [NPM](https://www.npmjs.com/):
    
        ```bash
        npm install
        ```  
3. Выполнить сборку проекта для среды окружения `production`:

    - Yarn:
    
        ```bash
        yarn dist
        ```
        
    - NPM:
    
        ```bash
        npm run dist
        ```

### Запуск

Запустить веб-сервер:

    - Yarn:
    
        ```bash
        yarn start
        ```
        
    - NPM:
    
        ```bash
        npm start
        ```
        
и открыть в браузере страницу `http://localhost:6006`.

### Тестирование
    
Для запуска unit- и snapshot-тестов предназначен скрипт `test`, а для вычисления процента покрытия кода тестами —
`test:coverage`:
 
- Yarn:
    
    ```bash
    yarn test
    yarn test:coverage  
    ```
        
- NPM:
    
    ```bash
    npm test
    npm run test:coverage
    ```

Тесты end-to-end запускаются скриптом `test:e2e`:
    
- Yarn:
    
    ```bash
    yarn test:e2e
    ``` 
        
- NPM:
   
    ```bash
    npm run test:e2e
    ```
        
Перед запуском тестов end-to-end необходимо собрать проект для среды окружения `production` (скрипт `dist`) или
`development` (скрипт `dist:dev`). Скриншоты, полученные в результате прогона тестов, помещаются в директории
`test-e2e/screenshots`.
