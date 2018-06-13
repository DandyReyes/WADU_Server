var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars');
var path = require('path');
var mongoose = require('mongoose');


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

/**********************************************************************************
    Mongoosejs open
***********************************************************************************/
  // getting-started.js
mongoose.connect('mongodb://admin:Busts1@ds257640.mlab.com:57640/wadu_results');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

var app = new express();

var kittySchema = mongoose.Schema({
    name: String
  });

var Kitten = mongoose.model('Kitten', kittySchema);

var silence = new Kitten({ name: 'Silence' });
console.log(silence.name); // 'Silence'

// NOTE: methods must be added to the schema before compiling it with mongoose.model()
kittySchema.methods.speak = function () {
    var greeting = this.name
      ? "Meow name is " + this.name
      : "I don't have a name";
    console.log(greeting);
  }
  var Kitten = mongoose.model('Kitten', kittySchema);

  var fluffy = new Kitten({ name: 'fluffy' });
  fluffy.speak(); // "Meow name is fluffy"

  fluffy.save(function (err, fluffy) {
    if (err) return console.error(err);
    fluffy.speak();
  });

  Kitten.find(function (err, kittens) {
    if (err) return console.error(err);
    console.log(kittens);
  })

  Kitten.find({ name: /^fluff/ }, callback);
/***********************************************************************************
    Mongoosejs end
************************************************************************************/

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