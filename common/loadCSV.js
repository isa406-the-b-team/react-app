const fs = require('fs');
const parse = require('csv-parse');
const async = require('async');
const axios = require('axios');

const getByte = (code) => {
  let date = 0;
  switch (code) {
    case '7D': 
      date = 0b01111111;
      break;
    case 'THU/FRI/SAT/SUN':
      date = 0b01000111;
      break;
    case 'FRI/SAT/SUN':
      date = 0b01000011;
      break;
    case 'SAT/SUN':
      date = 0b01000001;
      break;
    case 'SUN':
      date = 0b01000000;
      break;
    case '6D':
      date = 0b00111111;
      break;
    default: 
      date = null;
      break;
  }
  return date;
}

const loadAddresses = (filename) => {
  const parser = parse({delimiter: ',', columns: true});
  const recipients = [];
  fs.createReadStream(filename)
    .pipe(parser)
    .on('data', (row) => {
      const papers = [];
      Object.keys(row).forEach((key) => {
        if(row.hasOwnProperty(key) && key != 'Address') {
          const code = row[key];
          if (code != '') {
            const days = getByte(code);
            papers.push({
              newspaperCode: key,
              days: days
            })
          }
        }
      })
      recipients.push({
        street1: row.Address,
        city: 'Oxford',
        state: 'OH',
        zip: 15044,
        newspapers: papers.map((paper) => Object.assign({}, paper))
        
      })
    })
    .on('end', () => {
      const data = {
        routeId: 'Test CSV',
        recipients: recipients.map((recipient) => Object.assign({}, recipient))
      }
      console.log(JSON.stringify(data));
      axios.post('http://10.36.0.92:8080/route', data).catch((err) => {
        console.log(err.response);
      });
    })
}

loadAddresses('route.csv');
