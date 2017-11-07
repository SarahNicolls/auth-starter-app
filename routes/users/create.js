// exporting route config object
// method - the HTTP method used to access this endpoint -
// path - the request url to access this endpoint -
// method and path are used in conjunction with one another

// config - setting for how the request is handles after it's received
// config.auth.mode - if set to "optional", the route will be accessible
// without any authentication header

// handler - the function that will run when a request is received to the endpoint
// handler function(request, reply){}
// request - the request object containing all details including data, parameters, etc
// reply - function that allows us to send an HTTP response
// with data or a message to the requester

module.exports = {
  method: "POST",
  path: "/api/users",
  config: {
    // *** #4 for auth (go to login as well) (next go to models.user)
    auth: {
      mode: "optional"
    },
    handler: function(request, reply) {
      // creating a new instace of a new user from the User db model
      // will validate any data passed in by comparing to the modelSchema
      let user = new this.models.User(request.payload);

      user
        .save() // saves the new user record to the database
        // *** #11 for auth
        .then(user => {
          delete user.password;
          reply(user);
        })
        .then(user => reply(user)) // sends the saved user record in the HTTP response
        .catch(err => reply(err)); // sends the error if one occured int he HTTP response
    }
  }
};
