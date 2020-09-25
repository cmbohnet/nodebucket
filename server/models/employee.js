/**
 * Title: employee.ts
 * Author: Chris Bohnet
 * Date: 23 September 2020
 * Description: employee module
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//employee schema, sprint 1

let employeeSchema = new Schema({
  empId: {type: String, unique: true, dropDups: true},
  firstname: {type: String},
  lastname: {type: String}
}, {collection: 'employees'})
//this is the collection of employees that needs to be identified

module.exports = mongoose.model
('Employee', employeeSchema);
