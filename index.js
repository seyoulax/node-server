//importing plugins
const { response } = require('express');
const express = require('express');
//initializating application express
const app = express();
//importing filemaster
const fileMaster = require('./services/file-master')
const fs = require('fs')
//creating connection to db
function config() {
      return {
        host: "94.228.126.172",
        port: 3306,
        user: "inordic_sch_usr",
        password: "VANCfzNsov9GDt1M",
        database: "inordic_school",
        connectionLimit : 1000,
        connectTimeout  : 60 * 60 * 1000,
        acquireTimeout  : 60 * 60 * 1000,
        timeout         : 60 * 60 * 1000
      }
    }
/**The plan of an e-store
 * Basic requests:
 * - Gain user`s data by password and login
 * - Gain goods data
 * - Gain good data
 * Basic request for admin`s interface:
 * - Delete item
 * - Add item
 * - Edit item
 * - Show user`s array
 * - Delete user
 * - Edit User
 * 
 * Additionally table of bought goods history
 * - Show history
 * 
 * Homework:
 * write all basic routes
*/
//first plain route
app.get('/', function(request, response){
    //decomposing get-params
    response.send(
        `<h1>
            Nav Page
        </h1>
        <ul>
            <arcticle style="margin-bottom: 20px">
                <h2>Товары</h2>
                <li/>
                    <a href="/products/get">Посмотреть все товары</a>
                <li/>
                    <a href="/products/get/1">Посмотреть первый товар</a>
                <li/>
                    <a href="/products/add_form">Добавить товар</a>
                <li/>
                    <a href="/products/del/1">Удалить первый товар</a>
                <li/>
                    <a href="/products/edit_form">Редактировать товар</a>
            </article>
            <article style="margin-bottom: 20px">
                <h2>Пользователи</h2>
                <li />
                    <a href="/users/get">Посмотреть всех пользователей</a>
                <li />
                    <a href="/users/get/1">Посмотреть первого пользователя</a>
                <li />
                    <a href="/users/add_form">Добавление пользователей</a>
                <li />
                    <a href="/users/edit_form">Редактирование пользователей</a>
                <li />
                    <a href="/users/del/1">Удалить первого пользователя</a>
            </article>
            <article style="margin-bottom: 20px">
                <h2>Отзывы</h2>
                <li />
                    <a href="/reviews/get">Посмотреть все отзывы</a>
                <li />
                    <a href="/reviews/get/1">Посмотреть первый отзыв</a>
                <li />
                    <a href="/reviews/add_form">Добавление отзыва</a>
                <li />
                    <a href="/reviews/edit_form">Редактирование отзыва</a>
                <li />
                    <a href="/reviews/del/1">Удалить первый отзыв</a>
            </article>
            <article>
            <h2>Файлы</h2>
            <li />
                <a href="/files/add_form">Записать файл</a>
            <li />
                <a href="/files/del_form">Удалить file</a>
            </article>
            <article>
                <h2>Почта</h2>
                <li />
                    <a href="/mail/send_form">Отправить письмо</a>
            </article>
        </ul>
        `
    )
})
//working with files(FS)
const MAIN_DIR = 'routes'
const folders = fs.readdirSync(`./${MAIN_DIR}`)
folders.map( folderName =>{
    const FolderArray = fs.readdirSync(`./${MAIN_DIR}/${folderName}`)
    FolderArray.map( fileName =>
     {
        require(`./${MAIN_DIR}/${folderName}/${fileName}`)(app)
     }
    )
})
//listen to port
app.listen(3000)