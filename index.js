//importing plugins
const { response } = require('express');
const express = require('express');
//initializating application express
const app = express();
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
            Hello
        </h1>
        <section>
            <span>
                ${test}: ${text}
            </span>
        </section>
        <form action='/test1' method="post">
            <input />
            <input type="submit" />
        </form>
        `
    )
})
app.get('/products', function(request, response) {
    response.send(
        `
            Тут полуаем все товары
        `
    )
})
app.post('/test1', function(request, response){
    response.send(
        `
         Privet 
        `
    )
})
//listen to port
app.listen(3000)