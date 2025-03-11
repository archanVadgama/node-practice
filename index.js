const http = require('http');

const server = http.createServer((req, res) => {
  console.log(req.url);
  res.writeHead(200, { 'Content-Type': 'text/html' });

  let content = "<a href='/'>Home</a>&nbsp;&nbsp;<a href='/blog'>Blog</a>&nbsp;&nbsp;<a href='/about'>About</a><br>";

  switch (req.url) {
    case '/':
      content += '<h1>Home Page</h1>';
      break;
    case '/blog':
      content += '<h1>Blog Page</h1>';
      break;
    case '/about':
      content += '<h1>About Page</h1>';
      break;
    default:
      content += '<h1>404 Page Not Found</h1>';
      break;
  }

  res.end(content);
});

server.listen(8000, () => {
    console.log('Server is running on http://localhost:8000');
}
);
