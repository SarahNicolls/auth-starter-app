// *** #5 for auth (look on page for more of #5)
// import bcrypt for password utility functions
// such as generating salts, hases, and comparing plain text passwords
// to secure hash values
const bcrypt = require("bcrypt-as-promised");

const jwt = require("jsonwebtoken");
// *** #10 for auth (look below for more from 10)

// model is exported as a function
// db instance is passed in as the parameter

module.exports = db => {
  // creating a user db model
  // a db model is a definition of what a particular data type is going to look like

  // db.createModel takes in 3 parameters (#3 is optional)
  // createModel(modelName, modelSchema, modelOptions(optional))

  // modelName - the name of the db table/collection the records will be stored in
  // modelSchema - the sahpe/definition of what the data will look like
  // modelOptions - alternate settings to chane the behaviour of how our data is
  // validated, saved or queried(read, fetched, retrieved)
  let User = db.createModel("User", {
    email: db.type.string().required(),
    password: db.type.string().required()
  });

  // *** #5 for auth (next look below )
  // define a method that can be called on all user documents
  // that will take a password value and transform it into a secure
  // has value that is safe to store in the database
  User.define("generatePassword", function() {
    return bcrypt
      .genSalt(10) // generate a salt
      .then(salt => bcrypt.hash(this.password, salt)) // generate a hash with the input password and salt
      .then(hash => Object.assign(this, { password: hash })) // update user with the hash as the password field value
      .catch(err => err);
  });

  // *** #8 for auth (next go to routes/users/login)
  // define a method that can be called on all user documents
  //that will take the password send to the api and compare it to the
  // password has stored on the user database record
  User.define("comparePassword", function(password) {
    return (bcrypt
        .compare(password, this.password) //compares the plain text password to the hash password thru an algorithm
        // authed will either by true or false
        // if authed is true, then return this, else false
        .then(authed => (authed ? this : false))
        .catch(err => err) );
  });

  // *** #10 for auth (next go to login)
  // defines a method to transform the user data into a
  // secure access token to our API
  User.define("generateJWT", function(user) {
    // call the jwt.sign(data, secretKey, optionsObject)
    // returns large random encoded string
    return jwt.sign(Object.assign({}, this), "supersecretsecret", {
      algorithm: "HS256"
    });
  });

  // *** #6 for auth
  //define event hook that will call any methods needed to run
  // before a new user doecument is saved to the database
  User.pre("save", function(next) {
    //  *** #7 for auth
    // check if users array that have the same email address is longer than 0
    // if longer than 0, proceed with an error
    User.filter({ email: this.email }).then(users => {
      if (users.length > 0) {
        return next("email and password combo is invalid");
      }

      // *** #6 still
      return this.generatePassword() //execute generate password on document
        .then(() => next()) //continue to allow doc to be saved
        .catch(err => next(err)); // pass error to stop doc from being saved
    });
  });

  // return the model from the function
  return User;
};
