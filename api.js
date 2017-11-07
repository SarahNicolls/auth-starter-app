// bringing in models and routes
const models = require("./models");
const routes = require("./routes");

// hapi plugins require a register export as a function
// function will receive (server, options, next)
// server- the server instance the plugin was registered to
// options - any options the server has already been configuired with
// next - a function that will move to execute the
// next plugin in the array of plugins registered
module.exports.register = (server, options, next) => {
  // server.bind takes all properties from the object passed in
  // and adds them to the server context(this) when inside a 'handler'
  // function of a route configuration
  // ex) this.models === server.models
  server.bind({
    models: models
  });

  // adds each route config as an API ENDPOINT
  // ENDPOINT - an address adn method combo that will trigger a server function
  // and provide a response bsack to the requester
  server.route(routes);

  // next - a function that will move to execute the
  // next plugin in the array of plugins registered
  next();
};

// hapi plugins are required to provide an export of register.attributes
// that contain a 'name' and "version" to differentiate between other plugins registered
// this is to avoid registereing duplicate plugins
module.exports.register.attributes = {
  name: "api",
  version: "0.0.1"
};
