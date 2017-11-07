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

  // return the model from the function
  return User;
};
