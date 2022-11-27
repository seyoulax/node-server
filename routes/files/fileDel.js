const multer = require('multer')
const uploads = multer({dest: 'uploads/'})
const sFile = uploads.single('FFILE')
const fs = require('fs')
module.exports = (app) => {
    app.get('/files/del_form', (req, res) => {
        res.send(
            `<form enctype="multipart/form-data" action="/files/del" method='post'>
                <input type="text" name="filename"/>
                <input type='submit' />
            </form>`
        )
    })
    app.post('/files/del', sFile, (req, res)=>{
        //delete methods
        fs.unlink(`./uploads/${req.body.filename}`, (err)=>{
            err ?
            res.send(err)
            :
            res.send('Succesfully')
        })
    })
}