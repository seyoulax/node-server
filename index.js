//importing plugins
const { response } = require('express');
const express = require('express');
const mysql = require('mysql');
//initializating application express
const app = express();
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
const mysqlConnect = mysql.createPool(config())
/**The plan of an e-store
 * Basic requests:
 * - Gain user`s data by pass and login
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
            <article>
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
        </ul>
        `
    )
})
//routes for products
require('./routes/products/products')(app)
require('./routes/products/product')(app)
require("./routes/products/productDel")(app)
require('./routes/products/productAdd')(app)
require('./routes/products/productEdit')(app)



//routes for users
require('./routes/users/addUser')(app)
require('./routes/users/users')(app)
require('./routes/users/userDel')(app)
require('./routes/users/user')(app)
require('./routes/users/userEdit')(app)

//listen to port
app.listen(3000)