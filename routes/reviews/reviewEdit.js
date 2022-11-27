const multer = require("multer");
const upload = multer({dest: 'uploads/'});
const filetest = upload.single('MYFILE');
const uuid = require("uuid");
const  TableMasterReviews  = require("../../services/tables-master/table-master-reviews")
module.exports = (app) => {
    app.get(`/reviews/edit_form/:item_id`, (req, res) => {
        let {item_id} = req.query
        console.log(item_id)
        res.send(
            `
            <form enctype="multipart/form-data" action=/reviews/edit/${item_id} method="post">
                <input type="text" placeholder="text" name="text" />
                <input type="text" placeholder="user" name="user" />
                <input type="text" placeholder="good_id" name="good_id" />
                <input type="submit" />
            </form>
            `
        )
    })
    app.post('/reviews/edit/:item_id', filetest, (req, res) => {
        const {item_id} = req.query
        const data = {
            'ID': item_id,
            'TEXT': req.body.text,
            'USER': req.body.user,
            'GOOD_ID': req.body.good_id
        }
        const table_master_reviews = new TableMasterReviews(res, req)
        table_master_reviews.update(data)
    })
}

