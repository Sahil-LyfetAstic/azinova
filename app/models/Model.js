const db = require("../config/db");
const bcrypt = require("bcrypt");
let ObjectId = require("mongodb").ObjectID;

module.exports = {
  Register: (userData) => {
    return new Promise(
      async (resolve, reject) =>
        await db
          .get()
          .collection("user")
          .findOne({
            email: userData.email,
          })
          .then((email) => {
            if (email) {
              resolve(false);
            } else {
              userData.password = bcrypt.hashSync(userData.password, 10);
              console.log(userData.password);
              db.get()
                .collection("user")
                .insertOne(userData)
                .then((status) => {
                  resolve(true);
                });
            }
          })
    );
  },

  Login: (userData) => {
    let response = {};
    return new Promise(
      async (resolve, reject) =>
        await db
          .get()
          .collection("user")
          .findOne({
            email: userData.email,
          })
          .then((user) => {
            if (!user) {
              response.Error = "Email not found";
              resolve(response);
            } else {
              if (user.username !== userData.username) {
                response.Error = "Incorrect Username";
              } else {
                bcrypt.compare(
                  userData.password,
                  user.password,
                  function (err, result) {
                    console.log(result);
                    if (!result) {
                      response.Error = "Incorrect Password";
                      resolve(response);
                    } else {
                      response.password = true;
                      response.data = user;
                      resolve(response);
                    }
                  }
                );
              }
            }
          })
    );
  },

  user: (userId) => {
    return new Promise(async (resolve, reject) => {
      await db
        .get()
        .collection("user")
        .findOne({
          _id: userId,
        })
        .then((userData) => {
          resolve(userData);
        });
    });
  },
};
