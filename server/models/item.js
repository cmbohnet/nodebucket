const mongoose
= require('mongoose');
const Schema = mongoose.Schema;

let itemSchema = new Schema({
  text: {type: String}
});

module.exports = itemSchema;
//created a schema that we are going to use for our model.

