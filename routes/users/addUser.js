const multer = require("multer");
const upload = multer({dest: 'uploads/'});
const filetest = upload.single('MYFILE');
const uuid = require("uuid");
const TablesMasterUsers = require('../../services/tables-master/table-master-users')
module.exports = (app, mysqlConnect) => {
    app.post("/users/add", filetest, function(req, res)
        {
            const data = {
                'ID' : uuid.v4(),
                'NAME' : req.body.NAME,
                'SURNAME' : req.body.SURNAME,
                'EMAIL' : req.body.EMAIL,
                'PHONE' : req.body.PHONE,
                'IMG' : req.body.IMG,
                'LOGIN' : req.body.LOGIN,
                'PASSWORD' : req.body.PASSWORD,
                'ROLE' : req.body.ROLE
            }
            const tables_master_users = new TablesMasterUsers(res, req)
            tables_master_users.addOne(data)
        }
    )
    app.get("/users/add_form", function(req, res)
        {
            res.send(
                `
                <form enctype="multipart/form-data" action="/users/add" method="post">
                    <input type="text" placeholder="name" name="NAME" />
                    <input type="text" placeholder="surname" name="SURNAME" />
                    <input type="email" placeholder="email" name="EMAIL" />
                    <input type="text" placeholder="phone" name="PHONE" />
                    <input type="text" placeholder="img" name="IMG" />
                    <input type="text" placeholder="login" name="LOGIN" />
                    <input type="text" placeholder="password" name="PASSWORD" />
                    <input type="text" placeholder="role" name="ROLE" />
                    <input type="submit" />
                </form>
                `
            )
        }
    )
}