module.exports = (app, mysqlConnect) => 
{
    app.get("/userDel", function(req, res)
        {
            const {user_id} = req.query
            const query = "DELETE FROM `users` WHERE `ID` = " + "'" + user_id + "'"
            mysqlConnect.query(query, (err, result) => 
                {
                    err ?
                        res.send(err) 
                    : 
                        res.send('status: OK')
                }
            )
        }
    )
}