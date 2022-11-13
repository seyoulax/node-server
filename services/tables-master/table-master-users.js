const query_master = require('../query-master/index')
module.exports = class TableMasterUsers extends query_master{
    #name = 'users'
    constructor(res, req){
        super();
        this.table_name = this.#name
        this.res = res 
        this.req = req
    }
}
