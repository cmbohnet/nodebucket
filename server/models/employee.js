/**
 * Title: employee.ts
 * Author: Chris Bohnet
 * Date: 23 September 2020
 * Description: employee module
 * Modifications:
 * 9/28/20 - added item schema
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const item = require('./item');
//imported the item schema, sprint 2

//employee schema, sprint 1

let employeeSchema = new Schema({
  empId:      {type: String, unique: true, dropDups: true},
  firstname:  {type: String},
  lastname:   {type: String},
  todo:       [item],
  done:       [item]
  //done [[text: {tpe:String}]] is another way of doing it but it is more cumbersome
  //also when adding more fields it can get really confusing
}, {collection: 'employees'})
//this is the collection of employees that needs to be identified

module.exports = mongoose.model
('Employee', employeeSchema);
