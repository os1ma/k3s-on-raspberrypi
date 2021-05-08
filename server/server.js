const http = require('http');
const process = require('process');

const PORT = 3000
const INTERVAL_MILLIS = process.env.INTERVAL_MILLIS || 1000;

const ON_RESPONSE = {
  "gpios": [
    {
      "pin": 21,
      "value": 1
    }
  ]
};

const OFF_RESPONSE = {
  "gpios": [
    {
      "pin": 21,
      "value": 0
    }
  ]
};

var response = ON_RESPONSE;

intervalObj = setInterval(() => {
  response = response === ON_RESPONSE ? OFF_RESPONSE : ON_RESPONSE;
}, INTERVAL_MILLIS);

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  body = JSON.stringify(response)

  res.end(body);
  console.log(body);
}).listen(PORT, () => console.log('Server http://localhost:' + PORT));

process.on('SIGTERM', () =>{
  console.log('Received SIGTERM at ' + (new Date()));
  server.close(() => {
    console.log('Server closed');
  });

  clearInterval(intervalObj);
  console.log('intervalObj cleared');
});
