const express = require('express');
const studentcontroller = require('../controllers/studentcontroller');

const routes = express.Router();

routes.post('/addStudent', studentcontroller.addStudent);
routes.get('/getAllStudents', studentcontroller.getAllStudents );
routes.patch('/updateStudent', studentcontroller.updateStudent );

module.exports = routes;
            