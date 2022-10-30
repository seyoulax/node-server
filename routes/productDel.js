module.exports = (app, mysqlConnect) => app.get("/productDel", function(req, res)
    {
        const {item_id} = req.query 
        const query = "DELETE FROM `goods` WHERE `ID`=" + item_id.toString()
        mysqlConnect.query(query, (err, result) => 
            {
                err ?
                res.send(
                    JSON.stringify(
                        {
                            "result" : false,
                            "error" : err
                        }
                    )
                )
                :
                res.send(
                    JSON.stringify(
                        {
                            "result" : true
                        }
                    )
                )
            }
        )
    }
)