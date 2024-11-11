//Создание простого сервера

//импорт модуля
const express = require('express');

//импорт модуля для чтения и записи в файл
const fs = require('fs');

// //Импорт модуля path
// const path = require('path');

//Создание приложения
const app = express();

// // //Создаем счетчик
let counter = 0;
let counterAbout = 0;

//Читаем JSON файлы
function readJson() {
  try {
    let readJsonResult = fs.readFileSync('./counter.json');
    parseResult =  JSON.parse(readJsonResult);
    return parseResult;     
  } catch (error) {
    return 0;   
  } 
}

function readJsonAbout() {
  try {
    let readJsonRes = fs.readFileSync('./counterAbout.json');
    parseRes =  JSON.parse(readJsonRes);
    return parseRes;     
  } catch (error) {
    return 0;   
  } 
}

//Функция для преобразования данных из string в int
function parseResults() {
  let num = parseInt(readJson());
  return num;
}

function parseResultsAbout() {
  let num = parseInt(readJsonAbout());
  return num;
}

function writeCounter() {
  fs.writeFile('./counter.json', JSON.stringify(`${counter}`), (err) => {
    if(err) {
      console.error(err);
    } else {
      console.log('Значение счетчика записано в файл!');
    }
  })
}

function writeCounterAbout() {
  fs.writeFile('./counterAbout.json', JSON.stringify(`${counterAbout}`), (err) => {
    if(err) {
      console.error(err);
    } else {
      console.log('Значение счетчика записано в файл!');
    }
  })
}

//Создаем обработчик для корневой страницы
app.get('/', (req, res) => {
  counter = parseResults();
  counter++;
  writeCounter(counter);
  res.send(`<h1>Начальная страница</h1>
    <h3>Количество просмотров: ${counter}</h3>
    <a href='/about'>Ссылка на страницу /about </a>`);
});


//Создаем обработчик для страницы about
app.get('/about', (req, res) => {
  counterAbout = parseResultsAbout();
  counterAbout++;
  writeCounterAbout(counterAbout);
  res.send(`<h1>Страница about!</h1>
    <h3>Количество просмотров: ${counterAbout}</h3>
    <a href='/'>Ссылка на страницу / </a>`);
});


const port = 3000;

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
