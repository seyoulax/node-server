const TableMasterProducts = require("./../../services/tables-master/table-master-products")
module.exports = (app) => app.get("/products/get/:item_id", function(req, res) 
    {
        const {item_id} = req.query
        const table_master_products = new TableMasterProducts(res, req)
        table_master_products.getOne(item_id)
    }
)