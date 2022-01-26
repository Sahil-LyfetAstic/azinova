// const AWS = require("aws-sdk");
// const dotnev = require("dotenv").config(); //npm install dotenv

// module.exports = {
//   sendOTP: (otp, mobNumber) => {
//     var mobileNo = +91 + mobNumber;
//     var params = {
//       Message: " Welcome! your mobile verification code is: " + otp,
//       PhoneNumber: mobileNo,
//     };
//     return new AWS.SNS({ apiVersion: "2010-03-31" })
//       .publish(params)
//       .promise()

//       .then((status) => {
//         if (status) {
//           return true;
//         } else {
//           return false;
//         }
//       });
//   },
// };


const client = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID || '',
  process.env.TWILIO_AUTH_TOKEN || '',
);


module.exports = {

  sendSm :(otp,mobNumber) => {
    client.messages
      .create({body: `Hi there your otp ${otp}`, from: 'Azinova', to: `+91${mobNumber}`})
      .then((message) => {
        if(message){
          return true
        }
        else {
          return false
        }
      });
  }
}