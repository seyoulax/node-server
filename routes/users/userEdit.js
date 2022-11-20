const multer = require('multer')
const upload = multer({dest: "uploads/"})
const gainedfile = upload.single('MYFILE')
const TableMasterUsers = require('../../services/tables-master/table-master-users')
module.exports = (app) => {
    app.get('/users/edit_form', function(req, res){
        res.send(
            `
                <form enctype="multipart/form-data" action="/users/edit" method="post">
                    <input type="text" placeholder="id" name="ID" />
                    <input type="text" placeholder="name" name="NAME" />
                    <input type="text" placeholder="surname" name="SURNAME" />
                    <input type="text" placeholder="email" name="EMAIL" />
                    <input type="text" placeholder="phone" name="PHONE" />
                    <input type="text" placeholder="img" name="IMG" />
                    <input type="text" placeholder="login" name="LOGIN" />
                    <input type="text" placeholder="password" name="PASSWORD" />
                    <input type="text" placeholder="role" name="ROLE" />
                    <input type="submit" />
                </form>
            `
        )
    })
    app.post("/users/edit", gainedfile, function(req, res)
    {
        const data = {
            'ID': req.body.ID,
            'NAME': req.body.NAME,
            'SURNAME': req.body.SURNAME,
            'EMAIL': req.body.EMAIL,
            'IMG': req.body.IMG,
            'PHONE': req.body.PHONE,
            'LOGIN': req.body.LOGIN,
            'PASSWORD': req.body.PASSWORD,
            'ROLE': req.body.ROLE,
        }
        const tables_master_users = new TableMasterUsers(res, req)
        tables_master_users.update(data)
    }
)
}