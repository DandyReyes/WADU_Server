var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars');
var path = require('path');

var app = new express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({origin: true, credentials: true}));

app.get('/getPhotos',function(request, response) {
    var photos = [
        {
            src : "http://www.gettingsmart.com/wp-content/uploads/2017/06/Program-Code-Feature-Image.jpg",
        }
    ];
    response.status(200).send(photos);
})




app.post('/sendEmail', function(request, response) {
    'use strict';
const nodemailer = require('nodemailer');

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'dandyjreyes@gmail.com', // generated ethereal user
            pass: 'Password' // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: 'dandyjreyes@gmail.com', // sender address
        to: 'dandyjreyes@gmail.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'index', // plain text body
        html: '<b>Hello world?</b>', // html body
        context: {
            fullName: request.body.firstName,
            email: request.body.email,
            comments: request.body.comments,
            phoneNumber: request.body.phoneNumber,
        }
    };

    let handlebarsOptions = {
        viewEngine: 'handlebars',
        viewPath: path.resolve('./templates'),
        extname: '.html'
    }

    transpoert.use('compile', hbs(handlebarsOptions));

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
});
    response.status(200).send('ok');
})

app.listen(8080, function() {
    console.log('My server is listening on local:8080')
})