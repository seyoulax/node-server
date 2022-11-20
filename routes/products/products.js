const TableMasterProducts = require("./../../services/tables-master/table-master-products")
module.exports = (app) => app.get('/products/get', function(req, res)
    {
        const table_master_products = new TableMasterProducts(res, req)
        table_master_products.getAll()
    }
)