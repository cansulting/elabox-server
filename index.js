// import all the required packages
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
var path = require('path');
// define port number
const port = process.env.PORT || 3001;

// define current version
currentVersion = 1.2
 
// instantiate express with the correct parameters
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
 
const stripe = require('stripe')('sk_test_ix2izFIVEy4BnZqEDO3xxhoL001rcr9YmE');


// create a Router
const router = express.Router();
 
// example of a GET method that returns a simple "Hello World"
router.get('/', (req, res) => {
  res.send( "HELLO WORLD" );
});


const auth = require('http-auth');
const basic = auth.basic({
      realm: "Elabox users only"
    }, (username, password, callback) => { 
      callback(username === "elabox" && password === "supersecret");
    }
);


router.get('/downloadcomp', basic.check((req, res) => {
  res.sendFile(path.join(__dirname + '/upgrades/check.png'))
}));

router.post('/checkupdate', (req, res) => {
  compVersion = req.body.compVersion
  if (compVersion < currentVersion){
    // return version number for update
    res.json({'update': true, 'version': '1.2'})
  }
  else {
    res.json({'update': false})
  }
});


router.post('/payment', (req, res) => {
  firstname = req.body.firstname
  lastname = req.body.lastname
  email = req.body.email
  address = req.body.address
  address2 = req.body.address2
  city = req.body.city
  country = req.body.country
  postalcode = req.body.postalcode

  // (async () => {
    stripe.paymentIntents.create({
      amount: 1099,
      currency: 'chf',
      // Verify your integration in this guide by including this parameter
      metadata: {integration_check: 'accept_a_payment'},
      shipping: {
        name: firstname+' '+lastname,
        address: {
          line1: address,
          line2: address2,
          city: city,
          country: country,
          postal_code: postalcode
        },
      },
      receipt_email: email,
    },function (err, result) {
      console.log(result)
    });
});

// (async () => {
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: 1099,
//     currency: 'chf',
//     // Verify your integration in this guide by including this parameter
//     metadata: {integration_check: 'accept_a_payment'},
//   });
// })();

 
// define the router to use
app.use('/', router);
 
// start express
app.listen(port, function() {
    console.log("Runnning on " + port);
});
 
module.exports = app;