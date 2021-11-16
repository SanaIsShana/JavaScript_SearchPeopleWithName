// A built in Node.js module that let us work with the file system
// (note: You DON'T have to install fs using npm install)
const fs = require('fs');

// Read the raw json
const rawJSON = require('./persons-raw.json');

// Convert the json to this structure - that's your job... How?
/*
[
  {
    id: 1-100
    firstName: 'Xxx',
    lastName: 'Yyy',
    email: '...',
    birthDate: 'YYYY-MM-DD',
    imageUrl: 'use the picture.large url from the raw json',
    phone: 'use cell phone number from the raw json,
    country: '...'
  },
  {
    ...next person, same format...
  }
]
*/

// For now until you written your part of the program just set
// convertedJSON to id, firstName and lastName only
// (it's up to you to create the structure mentioned above)
let convertedJSON = [];
for (let person of rawJSON) {
  convertedJSON.push({
    id: convertedJSON.length + 1,
    firstName: person.name.first,
    lastName: person.name.last,
    email: person.email,
    birthDate: person.dob.date.slice(0, 10),
    imageUrl: person.picture.large,
    phone: person.cell,
    country: person.location.country

  })
}

// Save the converted JSON to 'persons-filtered.json'
fs.writeFileSync(
  './persons-filtered.json',
  JSON.stringify(convertedJSON, '', '  '),
  'utf8'
);