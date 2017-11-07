// bringing in hapi to set up our server
const hapi = require("hapi");
const hapiAuthJwt = require("hapi-auth-jwt2");
// *** #1 yard add in terminal
// *** #2 for auth add hapiAuthJwt

// bringing in our api plug in to register api endpoints(routes)
const api = require("./api");

// initializing a server instance(you can have multiple server's running)
// building a server, server starts when we call start
const server = new hapi.Server();

//modifying the server settings
server.connection({
  host: "localhost",
  port: 4040,
  routes: {
    cors: true
    // for us in development stage
    // allows requests from all domains/origins
    // aka anyone can send a request to our api
  },
  router: {
    stripTrailingSlash: true
    // takes the last slash off of the incoming request urls
  }
});

// takes plugins in as an array and executes each plugin
// a plugin is a snippet of code that modifies the server settings
// more often than not is a pre build package we install
server
  .register([
    // *** #2 for auth (next go to api.js)
    hapiAuthJwt,
    {
      register: api
    }
  ])
  .then(() => {
    // turning on the server
    // endpoints(routes) in our api will now be reachable
    server
      .start()
      .then(() => console.log(`Server started at: ${server.info.uri}`))
      .catch(err => console.log(err));
  })
  .catch(err => console.log(err));
