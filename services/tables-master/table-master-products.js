const query_master = require('./../query-master')
module.exports = class TableMasterProducts extends query_master{
    #name = 'goods'
    constructor(res, req){
        super();
        this.table_name = this.#name 
        this.res = res
        this.req = req
    }
 }