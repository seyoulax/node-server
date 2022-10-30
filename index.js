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
//сlass`s desc
class testClass{
    name = "sdsdfdsfsf"
    static login = 5
    constructor(name){
        console.log(name)
        this.test()
    }
    test(){
        console.log('!!!!!!!!!!!!' + this.name)
    }
    static test1(){
        console.log('broooo')
    }
}
console.log(testClass.login)
let test = new testClass('hai')
test.test()
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
            Nav
        </h1>
        <ul>
            <li/>
                <a href="/products">Посмотреть все товары</a>
            <li/>
                <a href="/product?item_id=1">Посмотреть первый товар</a>
            <li/>
                <a href="/productAdd_form">Добавить товар</a>
            <li/>
                <a href="/productDel?item_id=1">Удалить первый товар</a>
            <li/>
                <a href="/productEdit_form">Редактировать товар</a>
        </ul>
        `
    )
})
require('./routes/products')(app, mysqlConnect)
require('./routes/product')(app, mysqlConnect)
require("./routes/productDel")(app, mysqlConnect)
require('./routes/productAdd')(app, mysqlConnect)
require('./routes/productEdit')(app, mysqlConnect)
//listen to port
app.listen(3000)