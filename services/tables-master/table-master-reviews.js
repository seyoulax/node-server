let query_master = require('../query-master/index')
module.exports =  class TableMasterReviews extends query_master{
    #name = `reviews`
    constructor(res, req){
        super();
        this.table_name = this.#name
        this.res = res 
        this.req = req
    }
}

