const TableMasterProducts = require("../../services/tables-master/table-master-users")
module.exports = (app, mysqlConnect) => 
{
    app.get("/products/del/:item_id", function(req, res)
        {
            const {item_id} = req.params
            const tables_master_products = new TableMasterProducts(res, req)
            tables_master_products.delete(item_id)
        }
    )
}