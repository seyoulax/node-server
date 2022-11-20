const mysql = require('mysql');

//абстрактный класс для работы с таблицам в бд
module.exports =  class QueryMaster{
    res = null 
    req = null
    table_name = null
    #config = {
        host: "94.228.126.172",
        port: 3306,
        user: "inordic_sch_usr",
        password: "VANCfzNsov9GDt1M",
        database: "inordic_school",
        connectionLimit : 1000,
        connectTimeout  : 60 * 60 * 1000,
        acquireTimeout  : 60 * 60 * 1000,
        timeout         : 60 * 60 * 1000
    }
    #connect = mysql.createPool(this.#config)
    
    query(query){
        this.#connect.query(query, (err, result) => 
            {
                err ? 
                this.res.send(JSON.stringify({status: false, ERROR: err}))
            :
                this.res.send(JSON.stringify({status: true, result: result}))
            }
        )       
    }

    getAll(){
        const query = `SELECT * FROM ${this.table_name}`
        this.query(query)
    }
    getOne(u_id){
        const query = `SELECT * FROM ${this.table_name} WHERE ID = '${u_id}'`
        this.query(query)
    }
    addOne(data){
        let query = "INSERT INTO `" + this.table_name + "` ("
        let fieldsQ = ""
        let valuesQ = " VALUES("
        let n = 0
        let data_length = Object.keys(data).length
        for(const field in data){
            n++;
            if(n == data_length){
                fieldsQ += "`" + field + "`"
                valuesQ += "'" + data[field] + "'"
            } else{
                fieldsQ += "`" + field + "`, " 
                valuesQ += "'" + data[field] + "',"
            }
        }
        fieldsQ += ")"
        query += fieldsQ + valuesQ + ")"
        this.query(query)           
    }
    update(data){
        let query = "UPDATE `" + this.table_name + "` SET"
        let setQ = ""
        let n = 0
        let data_length = Object.keys(data).length
        for(const field in data){
            n++;
            if(n == data_length){
                setQ += " `" + field + "` = '" + data[field] + "' WHERE `ID` = '" + data['ID'] + "'"
            } else{
                setQ += " `" + field + "` = '" + data[field] + "',"
            }
        }
        query += setQ
        console.log(query)
        this.query(query)    
    }
    delete(id){
        let query = `DELETE FROM ${this.table_name} WHERE ID = ${id}` 
        this.query(query)
    }
}