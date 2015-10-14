var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/test');
 
var db = mongoose.connection;
 
// db.on('error', function (err) {
// console.log('connection error', err);
// });
// db.once('open', function () {
// console.log('Database was Connected For Shortlink Insertion And Redirecting');
// });
 
var Schema = mongoose.Schema;
var short_link_schema = new Schema({
_id : String,
link : String 
});
 
mongoose.model('short_link', short_link_schema);
 

 