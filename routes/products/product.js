module.exports = (app, mysqlConnect) => app.get("/product", function(req, res) 
    {
        const {item_id} = req.query
        const query = "SELECT * FROM `goods` WHERE `ID`= " + item_id
        mysqlConnect.query(query, (err, result) => 
            {
                err ?
                res.send(err)
                :
                res.send(JSON.stringify(result))
            }
        )
        
    }
)