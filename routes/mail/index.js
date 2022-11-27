//const mailer = require("nodemailer")
//const LoremIpsum = require("lorem-ipsum").LoremIpsum;
const multer = require('multer')
const upload = multer({dest : "uploads/"})
const gainedfile = upload.single('MYFILE')
const MailWorker = require('../../services/mail-master')
/*const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 20,
      min: 15
    },
    wordsPerSentence: {
      max: 40,
      min: 20
    }
});*/
module.exports = (app) => {
    app.post('/mail/send', gainedfile, function(req, res){
           const message_text = req.body.text
           /*
            let transporter = mailer.createTransport({host: 'smtp.yandex.ru', port: 465, secure: 465, auth: { user: "dinmuhametovdanis", pass: "Danis5887"}});
            let mailOptions = {
                from: '"dinmuhametovdanis" <dinmuhametovdanis@yandex.ru>',
                to: 'danisdinm@gmail.com',
                subject: "сообщение от админа",
                html: `
                <div>
                    <article>
                        <h1>Поздравляем!, вы  зарегестрировались на получение рассылки о скидках</h1>
                        <p>${lorem.generateWords(1)}
                            ${lorem.generateSentences(2)}
                            ${lorem.generateParagraphs(3)}
                            ${message_text}
                        </p>
                    </article>
                </div>
            `
            }
            transporter.sendMail(mailOptions, (err, inf) => {
                err ?
                    res.send(err)
                :
                    res.send(inf)
            })*/
            const mailer = new MailWorker(req, res);
            mailer.sendMail(message_text);
        }
    )
    app.get('/mail/send_form', function(req, res){
        res.send(
            `
                <form enctype="multipart/form-data" action="/mail/send" method="post">
                    <input type="text" placeholder="text" name="text" />
                    <input value='Отправить письмо' type='submit' />
                </form>
            `
        )
    }
)
}