// create 150.000 records dynamic with this structure: {pan_hash:"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx","value":75700,"date":"2020-01-01T00:00:00.000Z"}
// pan_hash is a random string with 32 characters
// value is a random number between 10000 and 100000
// date is a random date between 2020-01-01 and 2020-12-31
// save the records in a file called "data.json"
// the file must be saved in the same folder as the index.js file
// the file must be saved in a human-readable format
// the file must be saved in a single line

const fs = require('fs');
const crypto = require('crypto');

const data = [];

for (let i = 0; i < 150000; i++) {
  const pan_hash = crypto.randomBytes(16).toString('hex');
  const value = Math.floor(Math.random() * (100000 - 10000) + 10000);
  const date = new Date(Math.floor(Math.random() * (1577836800000 - 1577836800000) + 1577836800000)).toISOString();
  data.push({ pan_hash, value, date });
}

fs.writeFileSync('data.json', JSON.stringify(data));

