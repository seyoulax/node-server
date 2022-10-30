const multer = require('multer')
const upload = multer({dest : "uploads/"})
const gainedfile = upload.single('MYFILE')

module.exports = (app, mysqlConnect) => {
    app.get("/productEdit_form", function(req, res)
                {
                    res.send(
                        `
                            <form enctype="multipart/form-data" action="/productEdit" method="post">
                                <input type="text" placeholder="id" name="ID" />
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
    app.post("/productEdit", gainedfile, function(req, res)
                {
                    const {ID, TITLE, DESC, PRICE, IMG, COUNT} = req.body
                    const query = "UPDATE `goods` SET `TITLE`='" + TITLE + "', `DISCR`='" + DESC + "', `PRICE` = '" + PRICE + "', `IMG` ='" + IMG + "', `COUNT`= '" + COUNT + "' WHERE `ID`= '" + ID + "'"
                    mysqlConnect.query(query, (err, result) =>  
                        {
                            if(err){
                                res.send(err)
                            }else{
                                if(result.affectedRows == 0){
                                    res.send(JSON.stringify({"status" : "invlaid id", 'sended' : result}))
                                }else{
                                    res.send(JSON.stringify({'status' : 'OK', 'sended': result}))
                                }
                            }
                        }
                    )
                }
            )
}