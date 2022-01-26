var express = require('express');
var app = express.Router();
const Controller = require('../controllers/User')

app.post('/login', Controller.Login)
app.post('/register',Controller.Register)
app.post('/otp', Controller.otpVerification)

module.exports = app;