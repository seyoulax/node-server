const TableMasterUsers = require("../../services/tables-master/table-master-users")
module.exports = (app, mysqlConnect) => 
{
    app.get("/users/del/:user_id", function(req, res)
        {
            const {user_id} = req.params
            const tables_master_users = new TableMasterUsers(res, req)
            tables_master_users.delete(user_id)
        }
    )
}