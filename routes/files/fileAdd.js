const multer = require('multer')
//куда сохраняются
const uploads = multer({dest: 'uploads/'})
//название файла
const uploadFile = uploads.single('FFILE')  
const fs = require('fs')
module.exports = (app) => {
    app.get('/files/add_form', function(req, res)
        {
            res.send(
                `
                <form enctype="multipart/form-data" action="/files/add" method="post">
                    <input type="file" name="FFILE" />
                    <input type="submit" />
                </form>
                `
            )
        }
    )
    app.post('/files/add', uploadFile,(req, res) => {
       const file = req.file 
       const srcPath = file.path 
       const destPath = `uploads/${file.originalname}` 
       //lets create two streams for reading and writing files
       const src = fs.createReadStream(srcPath)
       const dest = fs.createWriteStream(destPath)
       //starting writing process
       src.pipe(dest)
       const apiRes = {} 
       //describe checkers of file`s uploading  
       src.on('end', () => 
            {
                apiRes.status = 200;
                apiRes.message = 'Succesfully!'
                res.send(JSON.stringify(apiRes))
            }
       )
       src.on('error', () => 
            {
                apiRes.status = 500;
                apiRes.message = 'ERROR!'
                res.send(JSON.stringify(apiRes))
            } 
        )
    })
}
