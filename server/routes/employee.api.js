/**
 * Title: employee.app.js
 * Author: Chris Bohnet
 * Date: 23 September 2020
 * Description: employee router module - Ndoe.js APIs
 * findEmployeeById
 * FindAllTasks
 * CreateTask
 * UpdateTask
 * DeleteTask
 *
 * Modifications:
 *
 */
const express = require('express');
const Employee = require('../models/employee');
const BaseResponse = require('../services/base-response');
const ErrorResponse = require('../services/error-response');
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

//FinAllTasks - should be separated into its own tasks (tasks.api.js)
router.get('/:empId/tasks', async(req, res) => {
 try {
   //empid to done now returns only those fields.  otherwise employee would return firstname and lastname as well
Employee.find({'empId': req.params.empId}, 'empId todo done', function(err, employee) {
  if (err) {
    console.log(err);
    const MongoDbErrorResponse= new ErrorResponse('500', 'internal error', err);
    res.status(500).send(MongoDbErrorResponse.toObject())


  } else {
    console.log(employee);

    const EmployeeTaskResponse= new BaseResponse('200', 'Query Successful', employee);

    res.json(EmployeeTaskResponse.toObject());

  }
})
 } catch (e) {
  const ErrorCatchResponse= new ErrorResponse('500', 'internal error', e.message);
  res.status(500).send(ErrorCatchResponse.toObject());

   }
 })


//API: createTask
router.post('/:empId/tasks', async(req, res) => {
  try {
    //empid to done now returns only those fields.  otherwise employee would return firstname and lastname as well
 Employee.findOne({'empId': req.params.empId}, function(err, employee) {
   if (err) {
     console.log(err);
     const CreateTaskMongoDbErrorResponse= new ErrorResponse('500', 'internal error', err);
     res.status(500).send(CreateTaskMongoDbErrorResponse.toObject());


   } else {
     console.log(employee);
     //create a new item obj
     const item = {
        text: req.body.text
     };
     //push it to the array
     employee.todo.push(item);
employee.save(function(err,updatedEmployee){
  if (err) {
    console.log(err);
    const CreateTaskOnSaveMongoDbErrorResponse= new ErrorResponse('500', 'internal error', err);
    res.status(500).send(CreateTaskOnSaveMongoDbErrorResponse.toObject());

  } else {
    console.log(updatedEmployee);
    const CreateTaskResponse= new BaseResponse('200', 'Query Successful', updatedEmployee);

     res.json(CreateTaskResponse.toObject());

  }
})

   }
 })
  } catch (e) {
    console.log(e);
   const createTaskErrorCatchResponse= new ErrorResponse('500', 'internal error', e.message);
   res.status(500).send(createTaskErrorCatchResponse.toObject());

    }
  })


 //API: update Task
 router.put('/:empId/tasks', async(req, res) => {
  try {
    //empid to done now returns only those fields.  otherwise employee would return firstname and lastname as well
 Employee.findOne({'empId': req.params.empId}, function(err, employee) {
   if (err) {
     console.log(err);
     const UpdateTaskMongoDbErrorResponse= new ErrorResponse('500', 'internal error', err);
     res.status(500).send(UpdateTaskMongoDbErrorResponse.toObject());

   } else {
     console.log(employee);
     //update employee obj
     //todo and done come from the angular client
    employee.set({
      todo: req.body.todo,
      done: req.body.done
    });

  employee.save(function(err,updatedEmployee){
  if (err) {
    console.log(err);
    const UpdateTaskOnSaveMongoDbErrorResponse= new ErrorResponse('500', 'internal error', err);
    res.status(500).send(UpdateTaskOnSaveMongoDbErrorResponse.toObject());

  } else {
    console.log(updatedEmployee);
    const UpdateTaskOnSaveResponse= new BaseResponse('200', 'Query Successful', updatedEmployee);

     res.json(UpdateTaskOnSaveResponse.toObject());

  }
})

   }
 })
  } catch (e) {
    console.log(e);
   const updateTaskErrorCatchResponse= new ErrorResponse('500', 'internal error', e.message);
   res.status(500).send(updateTaskErrorCatchResponse.toObject());

    }
  })



//API: deleteTask
router.delete('/:empId/tasks/:taskId', async(req, res) => {
  try {
    //empid to done now returns only those fields.  otherwise employee would return firstname and lastname as well
   Employee.findOne({'empId': req.params.empId}, function(err, employee) {
   if (err) {
     console.log(err);
     const DeleteTaskMongoDbErrorResponse= new ErrorResponse('500', 'internal error', err);
     res.status(500).send(DeleteTaskMongoDbErrorResponse.toObject());

   } else {
     console.log(employee);
     const todoItem = employee.todo.find(item => item._id.toString() == req.params.taskId);
     const doneItem = employee.done.find(item => item._id.toString() == req.params.taskId);

     if (todoItem) {
       employee.todo.id(todoItem._id).remove();

       employee.save(function(err,updatedTodoItemEmployee){
       if (err) {
          console.log(err);
          const DeleteTodoItemOnSaveMongoDbErrorResponse= new ErrorResponse('500', 'internal error', err);
          res.status(500).send(DeleteTodoItemOnSaveMongoDbErrorResponse.toObject());

       } else {
          console.log(updatedTodoItemEmployee);
          const DeleteTodoItemSuccessResponse= new BaseResponse('200', 'remove item from the todo list', updatedTodoItemEmployee);

          res.json(DeleteTodoItemSuccessResponse.toObject());

      }
    })

     } else if (doneItem) {
      employee.done.id(doneItem._id).remove();

      employee.save(function(err,updatedDoneItemEmployee){
      if (err) {
         console.log(err);
         const DeleteDoneItemOnSaveMongoDbErrorResponse= new ErrorResponse('500', 'internal error', err);
         res.status(500).send(DeleteDoneItemOnSaveMongoDbErrorResponse.toObject());

      } else {
         console.log(updatedDoneItemEmployee);
         const DeleteDoneItemSuccessResponse= new BaseResponse('200', 'remove item from the done list', updatedDoneItemEmployee);

         res.json(DeleteDoneItemSuccessResponse.toObject());

     }
   })
     } else {
       console.log('invalid task id');
       const DeleteTaskNotFoundResponse= new BaseResponse('200', 'unable to locate the requested task', null);

       res.json(DeleteTaskNotFoundResponse.toObject());

     }
   }
 })
  } catch (e) {
     console.log(e);
     const deleteTaskErrorCatchResponse= new ErrorResponse('500', 'internal error', e.message);
     res.status(500).send(deleteTaskErrorCatchResponse.toObject());

    }
  })


module.exports = router;
