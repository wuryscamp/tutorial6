'use strict';

let Student = function(code, name, department, age){
  this.code = code;
  this.name = name;
  this.department = department;
  this.age = age;
};

module.exports = Student;
