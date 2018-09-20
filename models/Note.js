var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object

var Noteschema = new Schema({
  // `title` is of type String
  title: String,
  // `body` is of type String
  body: String
});

var Note = mongoose.model("Note", Noteschema);
module.exports = Note;
