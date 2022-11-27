const TableMasterReviews  = require("../../services/tables-master/table-master-reviews")
module.exports = (app) => {
    app.get('/reviews/get', (req, res) => {
        const table_master_reviews = new TableMasterReviews(res, req)
        table_master_reviews.getAll()
    })
}
