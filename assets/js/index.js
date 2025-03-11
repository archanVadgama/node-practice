const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

  let contentToReplace = '';
  switch (req.url) {
    case '/':
      contentToReplace = '<h1>Home Page</h1>';
      break;
    case '/blog':
      contentToReplace = '<h1>Blog Page</h1>';
      break;
    case '/about':
      contentToReplace = '<h1>About Page</h1>';
      break;
    default:
      contentToReplace = '<h1>404 Page Not Found</h1>';
      break;
  }

  if (req.url === '/favicon.ico') return;

  let logInfo = 'Visited URL ---> ' + req.url + ' --- Time Stamp ---> ' + new Date().toString() + '\n';
  fs.appendFile('assets/site.log', logInfo, (err) => {
    if (err) {
      console.error('Error appending to log file:', err);
    }
  });

  fs.readFile('assets/site.log', 'utf8', (err, logData) => {
    if (err) {
      console.error('Error reading log file:', err);
      res.writeHead(500);
      res.end('Server Error');
      return;
    }

    fs.readFile('index.html', 'utf8', (err, indexData) => {
      if (err) {
        console.error('Error reading index.html:', err);
        res.writeHead(500);
        res.end('Server Error');
        return;
      }

      const modifiedIndex = indexData.replace('<replaceContent>', contentToReplace).replace('<logs>', logData);
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(modifiedIndex);
    });
  });
});

server.listen(8000, () => {
  console.log('Server is running on http://localhost:8000');
});