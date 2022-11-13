const QueryMasterUsers = require('../../services/tables-master/table-master-users')
module.exports = (app) => {
    app.get("/users/get", function(req, res)
        {   
            //creating class`s example
            const query_master_users = new QueryMasterUsers(res, req)
            query_master_users.getAll();
        }
    )
}