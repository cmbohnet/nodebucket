/**
 * Title: app.js
 * Author: Chris Bohnet
 * Date: 23 September 2020
 * Description: app module
 */
/**
 * Require statements
 */
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const { send } = require('process');
const Employee = require('./models/employee');
/**
 * App configurations
 */
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': true}));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../dist/nodebucket')));
app.use('/', express.static(path.join(__dirname, '../dist/nodebucket')));

/**
 * Variables
 */
const port = 3000; // server port

// TODO: This line will need to be replaced with your actual database connection string
//const conn = 'mongodb+srv://superadmin:s3cret@cluster0-lujih.mongodb.net/nodebucket?retryWrites=true&w=majority';
const conn = 'mongodb+srv://nodebucket_user:h5uAx9DYpUwT1Nki@cluster0.3uuui.mongodb.net/nodebucket?retryWrites=true&w=majority';

/**
 * Database connection
 */
mongoose.connect(conn, {
  promiseLibrary: require('bluebird'),
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
}).then(() => {
  console.debug(`Connection to the database instance was successful`);
}).catch(err => {
  console.log(`MongoDB Error: ${err.message}`)
}); // end mongoose connection

/**
 * API(s) go here ...
 *
 */
//findEmployeeById
app.get('/api/employees/:empId', async(req, res) => {
try {
  //use the mongoose employee model to query MongoDb Atlas by employeeId
 //use employee model to query db to pull back emp rec to match route parameter
 Employee.findOne({'empId': req.params.empId}, function(err,employee){
  //if there is a database level error, handle by returning a server 500 error
  if (err) {
      console.log(err); //returns only db
      res.status(500).send({
        'message': 'internal server error'
      })

    } else {
      //if there are no database level errors, return the employee object {}
      console.log(employee);
      res.json(employee);
    }
 })

 //empId above has to match what is in get statement and what's in your model and what's in the db
//findOne returns one document.  find returns more


} catch (e) {
  //catch any potential errors we didn't prepare for
  console.log(e);
  res.status(500).send({
    'message': 'Internal server error'
  })
}

})
//:empId is a placeholder that captures the empid value.  so http://localhsot:3000/api/employees/1012 for example
//can add multiple parameters so ...../:empId/:dob translates to url of /1012/2020-12-01
/**
 * Create and start server
 */
http.createServer(app).listen(port, function() {
  console.log(`Application started and listening on port: ${port}`)
}); // end http create server function
