const http = require('http');
const hostname = 'localhost';
const port = 8000;

const person = JSON.stringify({
  name: 'Bob',
  age: 92,
  hair: false
});

http
  .createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(person);
  })
  .listen(port, hostname, function() {
    console.log('Server running at http://' + hostname + ':' + port + '/');
  });