/**
 * Title: item.js
 * Author: Chris Bohnet
 * Date: 28 September 2020
 * Description: item (task) module (Mongoose schema)
 * Modifications:
 */
const mongoose= require('mongoose');
const Schema = mongoose.Schema;

let itemSchema = new Schema({
  text: {type: String}
}, {collection: 'items'});
//});

//}, {collection: 'items'})
//this is the collection of employees that needs to be identified

module.exports = itemSchema;
//created a schema that we are going to use for our model.

