const QueryMasterUsers = require('../../services/tables-master/table-master-users')
module.exports = (app) => {
    app.get('/users/get/:id', function(req, res)
        {
            const {id} = req.params
            const query_master_users =  new QueryMasterUsers(res, req)
            query_master_users.getOne(id)
        }
    )
}