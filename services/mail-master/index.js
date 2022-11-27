module.exports = class MailMaster{
    #transporter
    res
    req
    #mailer = require("nodemailer")
    #config = {host: 'smtp.yandex.ru', port: 465, secure: 465, auth: { user: "dinmuhametovdanis", pass: "Danis5887"}};
    #mailOptions = {
        from: '"dinmuhametovdanis" <dinmuhametovdanis@yandex.ru>',
        to: 'danisdinm@gmail.com',
        subject: "сообщение от админа",
        html: ''
    }
    constructor(req, res){
        this.#transporter = this.#setTransporter()
        this.req = req 
        this.res = res
    }
    #setTransporter(){
        return this.#mailer.createTransport(this.#config)
    }
    sendMail(message, res){
        this.#mailOptions.html = `${message}`
        this.#transporter.sendMail(this.#mailOptions, (err, inf) => {
            err ?
                this.res.send(err)
            :
                this.res.send(inf)
        })
    }
}