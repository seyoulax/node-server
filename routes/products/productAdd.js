const multer = require("multer");
const upload = multer({dest: 'uploads/'});
const filetest = upload.single('MYFILE');
const uuid = require("uuid")
module.exports = (app, mysqlConnect) => {
app.post("/productAdd", filetest, function(req, res)
            {
                const id = uuid.v4();
                const desc = req.body.DESC
                const title = req.body.TITLE
                const price = req.body.PRICE
                const count = req.body.COUNT
                const img = req.body.IMG
                const query = "INSERT `goods`(`ID`, `TITLE`, `DISCR`, `PRICE`, `IMG`, `COUNT`) VALUES('" + id + "', '" + title + "', '" + desc + "', '" + price + "', '" + img + "', '" + count + "')"
                mysqlConnect.query(query, (err, result) => 
                    {
                        err ?
                        res.send(err)
                        :
                        res.send(JSON.stringify({"status" : "OK"}))
                    }
                )
            }
        )
app.get('/productAdd_form', function(req, res)
            {
                res.send(
                    `
                    <form enctype="multipart/form-data" action="/productAdd" method="post">
                        <input type="text" placeholder="title" name="TITLE" />
                        <input type="text" placeholder="desc" name="DESC" />
                        <input type="text" placeholder="price" name="PRICE" />
                        <input type="text" placeholder="count" name="COUNT" />
                        <input type="text" placeholder="img" name="IMG" />
                        <input type="submit" />
                    </form>
                    `
                )
            }
        )
}
