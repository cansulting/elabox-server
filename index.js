// import all the required packages
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
// define port number
const port = process.env.PORT || 3001;

// define current version
currentVersion = 1.2
 
// instantiate express with the correct parameters
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
 
// create a Router
const router = express.Router();
 
// example of a GET method that returns a simple "Hello World"
router.get('/', (req, res) => {
  res.send( "HELLO WORLD" );
});

router.post('/checkupdate', (req, res) => {
  compVersion = req.body.compVersion
  if (compVersion < currentVersion){
    res.json({'update': true})
  }
  else {
    res.json({'update': false})
  }
});
 
// define the router to use
app.use('/', router);
 
// start express
app.listen(port, function() {
    console.log("Runnning on " + port);
});
 
module.exports = app;