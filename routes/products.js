module.exports = (app, mysqlConnect) => app.get('/products', function(req, res)
    {
        const query = "SELECT * FROM `goods`"
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