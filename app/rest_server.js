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
      res.json(todos.map(function(t) {
        return {id: t.id, title: t.title, due_date: t.due_date};
      }));
    },
    html: function() {
      res.send('<html><body><ul>' + todos.map(function(t) {
        return '<li>' + t.id + ' : ' + t.title + ' ' + t.due_date + '</li>';
      }).join('') + '</ul></body></html>');
    }
  });
});

app.get('/todo/:id', function(req, res) {
  var id = parseInt(req.params.id);
  res.format({
    json: function() {
      for(var i = 0; i < todos.length; i++) {
        if(id === todos[i].id){
          res.json(todos[i]);
          return;
        }
      }
      res.json(404, {});
    }
  });
});


app.post('/todo', function(req, res) {
  var todo;
  todo = req.body;
  if(todo.title && todo.due_date && todo.description) {
    todos.push({id: id++, title: todo.title, due_date: todo.due_date, description: todo.description});
    res.send(201);
  } else {
    res.send(400)
  }
});

app.put('/todo/:id', function(req, res) {
  var id = parseInt(req.params.id);
  var todo;
  for(var i = 0; i < todos.length; i++){
    if(todos[i].id === id) {
      todo = req.body;
      if(todo.title && todo.due_date && todo.description) {
        todos[i] = {id: id, title: todo.title, due_date: todo.due_date, description: todo.description}
        res.send(202);
        return;
      } else {
        res.send(400);
        return;
      }
    }
  }
  res.send(404);
});


module.exports = app;
