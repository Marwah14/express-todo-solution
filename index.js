// require all the libraries we need for the app:
var express         = require('express');
var mustache        = require('mustache-express');
var port            = 3000;
var logger          = require('morgan');  // makes pretty console logs
var bodyParser      = require('body-parser');  // lets us attach data to the request
var methodOverride  = require('method-override'); // lets us make forms that edit and delete
var tasksController = require('./controllers/tasks_controller')

var app = express();

// mustache config:
app.engine('html', mustache());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// morgan config:
app.use(logger('dev'));

// body-parser config:
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(methodOverride('_method'));

app.use('/tasks', tasksController);

app.get('/', function(req, res){
  res.render('./index');
})

app.listen(port, function(){
  console.log('yoyoyo it is runnin');
})


