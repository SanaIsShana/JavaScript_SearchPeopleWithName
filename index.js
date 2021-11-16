//Require/import the Express modules
const express = require('express');

//Create a web server
const webserver = express();

//Serve all content in the frontend folder
webserver.use(express.static('frontend'));

//Start the webserver on a specific port
//and then write to the console that it is up and running
webserver.listen(3000, () => console.log('Listening on port 3000'));

//Read json from the data.json file
let persons = require('./persons.json');

//Create a route/url that serves the persons data
webserver.get('/persons', (request, response) => {
  response.json(persons);
});

//Create a route/url that serves the data for ONE person
//based on which id we send to the route
//:id -> id is a request parameter
webserver.get('/persons/:id', (request, response) => {
  //A request parameter can be read by like this
  //(note that plus sign converts from string to number)
  let id = +request.params.id;
  //Search for a person in the persons array that 
  //has an id identical to the id we read from the request
  let person = persons.find(person => id === person.id);
  //Return the person data as json
  response.json(person || null);
});

//Create a route/url that serves the data for ONE person
//based on which id we send to the route
//:id -> is a request parameter
webserver.get('/persons/namesearch/:search', (request, response) => {
  //A request parameter can be read by like this
  //(note that we convert to lower case)
  let search = request.params.search.toLowerCase();
  //Search for a person in the persons array that 
  //has an id identical to the id we read from the request
  let foundPersons = persons.filter(person =>
    (person.firstName + ' ' + person.lastName).toLowerCase().includes(search)
  );
  //Return the person data as json
  //(only return the first 25 hits if more than 25 persons found)
  response.json(foundPersons.slice(0, 25));
});
