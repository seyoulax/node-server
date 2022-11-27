const TableMasterReviews = require("../../services/tables-master/table-master-reviews")
module.exports = (app) => {
    app.get('/reviews/get/:item_id', (req, res) => {
        const {item_id} = req.query
        const table_master_reviews = new TableMasterReviews(res, req)
        table_master_reviews.getOne(item_id)
    })
}