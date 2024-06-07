#
# healthy-lifestyle-website :apple:
## О проекте
    
Сайт где пользователи пишут статьи о рецептах полезного питания.

## Сайт:

https://healthy-lifestyle-website-frontend.vercel.app/



## :computer: Используемые технологии
 **Фронтенд:**
- ReactJS 
- Redux Toolkit
- React Hook Form
- React Router 
- React Markdown/Simple Editor
- Axios
Ссылка на второй репозиторий с frontend-частью: [frontend-репозиторий](https://github.com/algorithm-ssau/healthy-lifestyle-website-frontend)

 **Бэкенд:**
- NodeJS
- Express+Validator
- MongoDB
- Json Web Token
- Multer
- BCrypt

## :hammer: Установка 
1. Создать папку в которой будет храниться проект
2. Открыть папку в терминале
3. Клонировать репозиторий введя в терминал команду:
```
git clone https://github.com/algorithm-ssau/healthy-lifestyle-website.git
```
4. Перейти в папку healthy-lifestyle-website введя в терминал команду:
```
cd healthy-lifestyle-website
```
5. Поочередно выполнить следующие команды в терминале:
```
npm init
```
```
npm install express
```
6. Необходимо поправить код в файле index.js. заменить 
```
process.env.MONGODB_URI на
```
на IP адресс MongoDB
7. Ввести в терминал команду:
```
node index.js
```
В результате должны быть выведены строки: 
```
Server OK
```
```
DB OK
```
что значит backend успешно запущен.
8. Запустить   [фронтенд](https://github.com/algorithm-ssau/healthy-lifestyle-website-frontend.git) (инструкция по его запуску указанна в его репозитории)

## Участники проекта 

|                      Ник                       |          Имя            |          Роль
| ---------------------------------------------  | ----------------------- | -----------------------
|  [DariaAntt](https://github.com/DariaAntt)     |     Антипова Дарья      |   Team lead + Frontend
|  [rarayoyong](https://github.com/rarayoyong)   |   Григорьева Анастасия  |        Frontend
|  [OlGa-Aleks](https://github.com/OlGa-Aleks)   |    Александрова Ольга   |        Backend
|  [Kiriushonok](https://github.com/Kiriushonok) |    Садовников Кирилл    |        Backend

