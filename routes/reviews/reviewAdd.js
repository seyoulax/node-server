const multer = require("multer");
const upload = multer({dest: 'uploads/'});
const filetest = upload.single('MYFILE');
const uuid = require("uuid");
const  TableMasterReviews  = require("../../services/tables-master/table-master-reviews")
module.exports = (app) => {
    app.get('/reviews/add_form', (req, res) => {
        res.send(
            `
            <form enctype="multipart/form-data" action="/reviews/add" method="post">
                <input type="text" name="text" placeholder="text" />
                <input type="text" name="user" placeholder="user" />
                <input type="text" name="good_id" placeholder="good_id" />
                <input type="submit" />
            </form>
            `
        )
    })
    app.post("/reviews/add", filetest, (req, res) => {
        const data = {
            'ID': uuid.v4(),
            'TEXT': req.body.text,
            'USER': req.body.user,
            'GOOD_ID': req.body.good_id
        }
        const table_master_reviews = new TableMasterReviews(res, req)
        table_master_reviews.addOne(data)
    })
}