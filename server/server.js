const http = require('http');

const PORT = 3000
const INTERVAL_MILLISEC = 1000;

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

setInterval(() => {
  response = response === ON_RESPONSE ? OFF_RESPONSE : ON_RESPONSE;
}, INTERVAL_MILLISEC);

http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  body = JSON.stringify(response)

  res.end(body);
  console.log(body);
}).listen(PORT, () => console.log('Server http://localhost:' + PORT));
