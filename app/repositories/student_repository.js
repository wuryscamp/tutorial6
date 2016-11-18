'use strict';

let Student = require('../domains/student');

let StudentRepository = function(db){
  this.db = db;
};

StudentRepository.prototype = {
  save: function(s, cb, errCb){
    let db = this.db;
    let data = {code: s.code, name: s.name, department: s.department, age: s.age};
    let query = 'INSERT INTO student SET ?';
    db.query(query, data, (err, results) => {
      if(err){
        errCb(err);
      }
      cb(results);
    });
  },

  update: function(s, cb, errCb){
    let db = this.db;
    let data = [s.name, s.department, s.age, s.code];
    let query = 'UPDATE student SET name = ?, department = ?, age = ? WHERE code = ?';
    db.query(query, data, (err, results) => {
      if(err){
        errCb(err);
      }
      cb(results);
    });
  },

  delete: function(code, cb, errCb){
    let db = this.db;
    let query = 'DELETE FROM student WHERE code = ?';
    db.query(query, [code], (err, results) => {
      if(err){
        errCb(err);
      }
      cb(results);
    });
  },

  findOne: function(code, cb, errCb){
    let db = this.db;
    let query = 'SELECT * FROM student WHERE code = ?';
    db.query(query, [code], (err, results, fields) => {
      if(err){
        errCb(err);
      }
      if(!results){
        cb(`Data dengan code ${code}, tidak di temukan`);
      }else{
        let s = results[0];
        let student = new Student(s.code, s.name, s.department, s.age);
        cb(student);
      }
    });
  },

  findAll: function(cb, errCb){
    let db = this.db;
    let query = 'SELECT * FROM student';
    db.query(query, (err, results, fields) => {
      if(err){
        errCb(err);
      }
      if(!results){
        cb('tabel student kosong');
      }else{
        let studentArray = [];
        for(let i=0;i<results.length;i++){
          let s = results[i];
          let student = new Student(s.code, s.name, s.department, s.age);
          studentArray.push(student);
        }
        cb(studentArray);
      }
    });
  }
};

module.exports = StudentRepository;
