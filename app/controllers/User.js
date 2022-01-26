const Validator = require("validatorjs");
const Mailer = require("../utilities/Sms");
const Model = require("../models/Model");
const otpGenerator = require("generate-otp");
const utilities = require("../utilities/Sms");
var session = require("express-session");

module.exports = {
  Register: (req, res) => {
    let userData = req.body;
    const rules = {
      username: "required",
      email: "required|email",
      Mobile: "required|min:10|max:10",
      password: "required|min:6",
    };

    let validation = new Validator(userData, rules);
    if (validation.fails()) {
      return res.status(422).json(validation.errors.errors);
    }

    Model.Register(userData).then((status) => {
      console.log(status);
      if (!status) {
        return res.status(422).json({
          Error: "Email already Exist",
        });
      }

      return res.status(200).json({
        Success: "Registration completed",
      });
    });
  },

  Login: (req, res) => {
    let userData = req.body;
    const rules = {
      username: "required",
      email: "required|email",
      password: "required|min:6",
    };

    let validation = new Validator(userData, rules);
    if (validation.fails()) {
      return res.status(422).json(validation.errors.errors);
    }
    //generate otp

    Model.Login(req.body).then((status) => {
      if (status.password === true) {
        console.log(status.data);
        let otp = otpGenerator.generate(4);
        req.session.userId = status.data._id;
        req.session.otp = otp;
        utilities.sendSm(otp, status.data.mobile).then((status) => {
          if (status) {
            res.status(200).json({
              Success: "check your Sms",
            });
          } else {
            res.status(422).json({
              Error: "Cannot send Sms",
            });
          }
        });
      } else {
        res.status(422).json(status);
      }
    });
  },

  otpVerification: (req, res) => {
    if (req.session.otp) {
      if (req.session.otp === req.body.otp) {
        Model.user(req.session.userId).then((userData) => {
          res.status(200).json(userData);
        });
      }else{
          res.status(422).json({
              Error:"incorrect otp"
          })
      }
    } else {
      res.status(401).json({
        Error: "time out",
      });
    }
  },
};
