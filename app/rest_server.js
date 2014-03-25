'use strict';


var todos = require('./tododb');

var id = todos.length + 1;

var express = require('express');

var app = express();
app.use(express.logger());
app.use(express.json());

app.get('/todo', function(req, res) {
  res.format({
    json: function() {
      res.json(todos);
    },
    html: function() {
      res.send('<html><body><ul>' + todos.map(function(t) {
        return '<li>' + t.id + ' : ' + t.text + ' ' + t.due_date + '</li>';
      }).join('') + '</ul></body></html>');
    }
  }
)});


app.post('/todo', function(req, res) {
  var todo;
  var contentType = req.get('Content-Type');
  switch(contentType) {
    case 'application/json':
    todo = req.body;
    if(todo.text && todo.due_date) {
      todos.push({id: id++, text: todo.text, due_date: todo.due_date});
      res.send(201);
    } else {
      res.send(400)
    }
    break;
    default:
      res.send(406);
  }
});

app.put('/todo/:id', function(req, res) {
  var id = parseInt(req.params.id);
  var todo;
  for(var i = 0; i < todos.length; i++){
    if(todos[i].id === id) {
      todo = req.body;
      if(todo.text && todo.due_date) {
        todos[i] = {id: id, text: todo.text, due_date: todo.due_date}
        res.send(202);
        return;
      }
    }
  }
  res.send(404);
});


module.exports = app;
