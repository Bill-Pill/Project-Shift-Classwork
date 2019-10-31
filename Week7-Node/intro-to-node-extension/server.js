const http = require('http');
const hostname = 'localhost';
const port = 5000;

const cartoon = JSON.stringify({
  name: 'Courage',
  species: 'dog',
  age: 7,
  color: 'pink'
});

http
  .createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(cartoon);
  })
  .listen(port, hostname, function() {
    console.log('Server running at http://' + hostname + ':' + port + '/');
  });