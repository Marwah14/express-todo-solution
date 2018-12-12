var express = require('express');
var router = express.Router();

var tasks = require('../models/task');

router.get('/', tasks.getAll, renderIndex);
router.get('/new', renderNew);
router.get('/:id/edit', tasks.find, renderEdit);
router.get('/:id', tasks.find, renderShow);

// EDIT:
/* a get route that renders our edit form.  
  It needs the data for the element that we are editing
*/

/* a put route that edits data in the database redirects to 
the show page for what was edited
*/

router.delete('/:id', tasks.delete, redirectIndex);
router.post('/', tasks.create, redirectShow);
router.put('/:id', tasks.update, redirectShow);

function redirectIndex(req, res) {
  res.redirect('/tasks');
}

function redirectShow(req, res) {
  res.redirect(`/tasks/${res.locals.todo_id}`);
}

function renderEdit(req, res) {
  var mustacheVariables = res.locals.task

  res.render('./tasks/edit', mustacheVariables);
}

function renderIndex(req, res){
  var mustacheVariables = {
    tasks: res.locals.tasks
  }

  res.render('./tasks/index', mustacheVariables);
}

function renderShow(req, res){
  // res.send(res.locals.task);
  var mustacheVariables = res.locals.task
  res.render('./tasks/show', mustacheVariables);
}

function renderNew(req, res){
  res.render('./tasks/new')
}

module.exports = router;