const multer = require("multer");
const upload = multer({dest: 'uploads/'});
const filetest = upload.single('MYFILE');
const uuid = require("uuid");
const TableMasterProducts = require("../../services/tables-master/table-master-products");
module.exports = (app, mysqlConnect) => {
app.post("/products/add", filetest, function(req, res){
            const data = {
                "ID" : uuid.v4(),
                "DISCR" : req.body.DESC,
                "TITLE" : req.body.TITLE,
                "PRICE" : req.body.PRICE,
                "COUNT" : req.body.COUNT,
                "IMG": req.body.IMG
            }
            const table_master_products = new TableMasterProducts(res, req)
            table_master_products.addOne(data)
        }
    )
app.get('/products/add_form', function(req, res)
            {
                res.send(
                    `
                    <form enctype="multipart/form-data" action="/products/add" method="post">
                        <input type="text" placeholder="title" name="TITLE" />
                        <input type="text" placeholder="desc" name="DISCR" />
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
