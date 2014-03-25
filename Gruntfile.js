'use strict';

module.exports = function(grunt) {
  var sys = require('sys');
  grunt.registerTask('default', function() {
    var app = require('./app/rest_server');
    console.log("Running server on port 3000. Press enter to exit");
    var done = this.async();
    app.listen(3000);
    var stdin = process.openStdin();
    stdin.addListener('data', function(d) {
      done(true);
    });
  });
}
