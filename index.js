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
    //sending response from server
    console.log(request.query.test)
    //decomposing get-params
    const {test, text} = request.query
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
app.get('/products', function(req, res) 
    {
        const query = "SELECT * FROM `goods`"
        mysqlConnect.query(query, (err, result) =>
            {
                err ? 
                    res.send(err) 
                    : 
                    res.send(JSON.stringify(result))
            }
        )
    }
)
app.get("/product", function(req, res) 
    {
        const {item_id} = req.query
        const query = "SELECT * FROM `goods` WHERE `ID`= " + item_id
        mysqlConnect.query(query, (err, result) => 
            {
                err ?
                res.send(err)
                :
                res.send(JSON.stringify(result))
            }
        )
        
    }
)
app.get("/productDel", function(req, res)
    {
        const {item_id} = req.query 
        const query = "DELETE FROM `goods` WHERE `ID`=" + item_id.toString()
        mysqlConnect.query(query, (err, result) => 
            {
                err ?
                res.send(
                    JSON.stringify(
                        {
                            "result" : false,
                            "error" : err
                        }
                    )
                )
                :
                res.send(
                    JSON.stringify(
                        {
                            "result" : true
                        }
                    )
                )
            }
        )
    }
)
app.post("/productAdd", function(req, res)
    {
        console.log(req)
        res.send('hey')
    }
)
app.get('/productAdd_form', function(req, res)
    {
        res.send(
            `
                <form action="/productAdd" method="post">
                    <input type="text" name="ID" />
                    <input type="text" name="TITLE" />
                    <input type="text" name="DISCR" />
                    <input type="text" name="PRICE" />
                    <input type="text" name="COUNT" />
                    <input type="text" name="IMG" />
                    <input type="submit" />
                </form>
            `
        )
    }
)
app.get("/productEdit_form", function(req, res)
    {
        res.send(
            `
                <form action="/productEdit" method="post">
                    <input type="text" name="ID" />
                    <input type="text" name="TITLE" />
                    <input type="text" name="DISCR" />
                    <input type="text" name="PRICE" />
                    <input type="text" name="COUNT" />
                    <input type="text" name="IMG" />
                    <input type="submit" />
                </form>
            `
        )
    }
)
app.get("/productEdit", function(req, res)
    {

    }
)
//listen to port
app.listen(3000)