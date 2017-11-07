// ** see create.js for notes

module.exports = {
  method: "POST",
  path: "/api/users/login",
  config: {
    // *** #4 for auth (next go to models.users)
    auth: {
      mode: "optional"
    },
    handler: function(request, reply) {
      // *** #9 for auth (next go to user.js)
      // grab the email and password values
      // from the request.payload object
      //(this is the body sent in the request)
      let { email, password } = request.payload;

      this.models.User
        .filter({ email: email }) //filter users by the login email
        .then(users => {
          // if there are 0 users with that email
          // throw error to the catch block
          if (users.length === 0) {
            throw "email and password comination is invalid";
          }
          // destructering user's array and getting the first item out of it
          // grab the user in the first index of the users array
          // because there should only be one account with that email so we just
          // need to grab one
          let [user] = users;
          // run the compare password function on the user document found
          //with the login email, and compare the login password
          //to the stored secure hash password value
          return user.comparePassword(password);
        })
        //once user has been authenicated, we'll get user back
        .then(user => {
          // if user is false, throw error message
          if (!user) {
            throw "email and password comination is invalid";
          }

          // *** #11 for auth
          //remove password before generated jwt
          //because the jwt is public info
          delete user.password;

          // if not, just reply with that user
          //STOPPPPPPPPP
          // before #10 it was a return reply(err)
          // *** #11 part of auth
          return user.generateJWT();
        })
        // *** #11 added a then statment
        .then(token => reply(token))
        .catch(err => {
          reply(err);
        });
    }
  }
};
