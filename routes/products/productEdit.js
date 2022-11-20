const multer = require('multer')
const TableMasterProducts = require('../../services/tables-master/table-master-products')
const upload = multer({dest : "uploads/"})
const gainedfile = upload.single('MYFILE')
module.exports = (app) => {
    app.get("/products/edit_form", function(req, res)
                {
                    res.send(
                        `
                            <form enctype="multipart/form-data" action="/products/edit" method="post">
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
    app.post("/products/edit", gainedfile, function(req, res)
                {
                    const {ID, TITLE, DESC, PRICE, IMG, COUNT} = req.body
                    const data = {
                        "ID" : ID,
                        "TITLE" : TITLE,
                        "DISCR" : DESC, 
                        "PRICE" : PRICE,
                        "IMG" : IMG,
                        "COUNT" : COUNT
                    }
                    const table_master_products = new TableMasterProducts(res, req)
                    table_master_products.update(data)
                }
            )
}