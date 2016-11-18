'use strict';

let db = require('../config/mysql_config');
let StudentRepo = require('../repositories/student_repository');
let Student = require('../domains/student');

let saveStudentShowForm = (req, res, next) => {
  res.render('new_student', {'title': 'Add New Student'});
};

let saveStudent = (req, res, next) => {
  if(!req.body){
    next('semua field harus diisi..');
  }
  let data = req.body;
  let student = new Student(data.code, data.name, data.department, parseInt(data.age));
  let studentRepo = new StudentRepo(db);
  studentRepo.save(student, result => {
    res.redirect('/');
  }, err => {
    if(err){
      next(err);
    }
  });
};

let updateStudentShowForm = (req, res, next) => {
  if(!req.params){
    next('parameter code tidak ada');
  }
  let code = req.params.code;
  let studentRepo = new StudentRepo(db);
  studentRepo.findOne(code, result => {
    res.render('update_student', {'student': result, 'title': 'Update Student'});
  }, err => {
    if(err){
      next(err);
    }
  });
};

let updateStudent = (req, res, next) => {
  if(!req.body){
    next('semua field harus diisi');
  }
  let data = req.body;
  let student = new Student(data.code, data.name, data.department, parseInt(data.age));
  let studentRepo = new StudentRepo(db);
  studentRepo.update(student, result => {
    res.redirect('/');
  }, err => {
    if(err){
      next(err);
    }
  });
};

let deleteStudent = (req, res, next) => {
  if(!req.params){
    next('parameter code tidak ada');
  }
  let code = req.params.code;
  let studentRepo = new StudentRepo(db);
  studentRepo.delete(code, result => {
    res.redirect('/');
  }, err => {
    if(err){
      next(err);
    }
  });
};

let getStudent = (req, res, next) => {
  if(!req.params){
    next('parameter code tidak ada');
  }
  let code = req.params.code;
  let studentRepo = new StudentRepo(db);
  studentRepo.findOne(code, result => {
    res.render('student_detail', {'student': result, 'title': 'Student Detail'});
  }, err => {
    if(err){
      next(err);
    }
  });
};

let getAllStudent = (req, res, next) => {
  let studentRepo = new StudentRepo(db);
  studentRepo.findAll(results => {
    res.render('index', {'students': results, 'title': 'Student List'});
  }, err => {
    if(err){
      next(err);
    }
  });
};

module.exports = {
  saveStudentShowForm: saveStudentShowForm,
  saveStudent: saveStudent,
  updateStudentShowForm: updateStudentShowForm,
  updateStudent: updateStudent,
  deleteStudent: deleteStudent,
  getStudent: getStudent,
  getAllStudent: getAllStudent
};
