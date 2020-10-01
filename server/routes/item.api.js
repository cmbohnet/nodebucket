/**
 * Title: item.app.js
 * Author: Chris Bohnet
 * Date: 23 September 2020
 * Description: item router module
 * Modifications:
 *
 */
const express = require('express');
const Employee = require('../models/employee');
const Item = require('../models/item');

const router = express.Router();

//findEmployeeById
router.get('/:empId', async(req, res) => {
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
  //:empId is a placeholder that captures the empId value.  so http://localhsot:3000/api/employees/1012 for example
  //can add multiple parameters so ...../:empId/:dob translates to url of /1012/2020-12-01

//FinAllTasks
//should be separated into its own tasks
//tasks.api.js
router.get('/:empId/tasks', async(req, res) => {
 try {
   //empid to done now returns only those fields.  otherwise employee would return firstname and lastname as well
Employee.find({'empId': req.params.empId}, 'empId todo done', function(err, employee) {
  if (err) {
    console.log(err);
    res.status(500).send({
      'message': 'Internal server error'
    })


  } else {
    console.log(employee);
    res.json(employee);
  }
})
 } catch (e) {
   res.status(500).send({
     'message': 'Internal server error'
   })
 }
})


//CreateTask

router.get('/:empId/create', async(req, res) => {
  try {
    //empid to done now returns only those fields.  otherwise employee would return firstname and lastname as well
 Employee.create({'empId': req.params.empId}, 'empId todo done', function(err, employee) {
   if (err) {
     console.log(err);
     res.status(500).send({
       'message': 'Internal server error'
     })


   } else {
     console.log(employee);
     res.json(employee);
   }
 })
  } catch (e) {
    res.status(500).send({
      'message': 'Internal server error'
    })
  }
 })

 //Update Task

router.get('/:empId/update', async(req, res) => {
  try {
    //empid to done now returns only those fields.  otherwise employee would return firstname and lastname as well
 Employee.findByIdAndUpdate({'empId': req.params.empId}, 'empId todo done', function(err, employee) {
//Employee.findOneAndUpdate({'empId':req.params.empId},{$pull:*{done*: {"text": req.params.text}}}
  if (err) {
     console.log(err);
     res.status(500).send({
       'message': 'Internal server error'
     })


   } else {
     console.log(employee);
     res.json(employee);
   }
 })
  } catch (e) {
    res.status(500).send({
      'message': 'Internal server error'
    })
  }
 })

module.exports = router;
