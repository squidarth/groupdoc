
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , mongoose = require('mongoose');

var app = module.exports = express.createServer();



// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

/* Mongoose Settings */

mongoose.connect('mongodb://localhost/groupdoc');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Document = new Schema({
  id : ObjectId, 
  title : String,
  content : String,
  created_at : Date
});

var Doc = mongoose.model("Document", Document);

// Routes

app.post("/doc", function (req, res) {
  //var content = req.body.content
  //var title = req.body.title
  var doc = new Doc({title: req.body.title, content: req.body.content});
  doc.save(function(err) {console.log("meow");});

  //doc.title = req.body.title;
  //doc.content = req.body.content;

  //doc.save(function(err) {console.log(err);});
  res.redirect("/");
});

app.get('/', function(req, res) {
  Doc.find(function(err, documents) {
    console.log("finished executing query");
    console.log({ title: 'Express', documents: documents});

    res.render('index', { title: 'Express', documents: documents});
    console.log("finished rendering");
  });
  console.log("exiting routing logic");
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
