var db = require('../db/dbconfig');
var task = {};

task.getAll = function(req, res, next){
  db.manyOrNone("SELECT * FROM todo;")
    .then(function(result){
        console.log('***************', result);
        res.locals.tasks = result;
        next();
    })
    .catch(function(error){
        console.log(error);
        next();
    });
}

// we use this for show AND for the edit GET route
task.find = function(req, res, next) {
  db.oneOrNone("SELECT * FROM todo WHERE id = $1;", [req.params.id])
    .then(function(result){
      console.log('$$$$$$$$$', result);
      res.locals.task = result;
      next();
    })
    .catch(function(error){
      console.log(error);
      next();
    })
}

// edit needs a method that updates data in the database:
task.update = function(req, res, next) {
  db.one(`UPDATE todo SET subject = $1, content = $2
   WHERE id = $3 RETURNING id;`, [req.body.subject, req.body.content, req.params.id])
   .then(function(result){
     console.log(`table updated for ${result.id}`);
     res.locals.todo_id = result.id;
     next();
   })
   .catch(function(error){
    console.log(error);
    next();
  })
}

task.delete = function(req, res, next) {
  db.none("DELETE FROM todo WHERE id=$1;", [req.params.id])
    .then(function(){
      console.log('SUCCESSFUL DELETE');
      next();
    })
    .catch(function(error){
      console.log(error);
      next();
    })
}

task.create = function(req, res, next) {
  db.one("INSERT INTO todo(subject, content) VALUES($1, $2) RETURNING id;", [req.body.subject, req.body.content])
    .then(function(result){
      res.locals.todo_id = result.id;
      next();
    })
    .catch(function(error){
      console.log(error);
      next();
    })
}


// a method that gets the data for the form



// a method that handles the submission for the form


module.exports = task;