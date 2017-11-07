// ** see create.js for notes

module.exports = {
  method: "GET",
  path: "/api/users/{userId}",
  config: {
    handler: function(request, reply) {
      // grabs the param 'userId' from the request url
      let userId = request.params.userId;

      this.models.User
        .get(userId) // fetches the User by the id found in the url
        .then(result => reply(result)) // sends the user found with the id in the HTTP response
        .catch(err => reply(err)); // sends the error if one occurred in the HTTP response
    }
  }
};
