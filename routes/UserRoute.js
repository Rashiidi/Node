const express = require('express')
const routes = express.Router()
const usercontroller = require('../controllers/usercontroller')

routes.post('/register', usercontroller.register)
// routes.post('/login', usercontroller.login)

module.exports = routes