// import thinky to setup a database connection
const thinky = require("thinky");
const userModel = require("./user");

// builds and configures the database connection
// and finally starts the connection(turns it on)
// this is what causes your server to blow up if RETHINKDB is not running
const db = thinky({
  db: "authWalkThrough"
});

//when we require ./user, we get that function and calling it directly and then
// passing in db and invoking it
let User = userModel(db);

// exporting the models as properites of this module
module.exports = {
  User: User
};
