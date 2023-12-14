const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer();


server.on("request", (req, res) => {

  let filePath = "";

  switch (req.url) {
    case "/":
      filePath = path.join(__dirname, "index.html");
      res.statusCode = 200;
      break;
    case "/about":
      filePath = path.join(__dirname, "about", "index.html");
      res.statusCode = 200;
      break;
    case "/blog":
      filePath = path.join(__dirname, "blog", "index.html");
      res.statusCode = 200;
      break;
    case "/contact":
      filePath = path.join(__dirname, "contact", "index.html");
      res.statusCode = 200;
      break;
    default:
      filePath += filePath = path.join(__dirname, "404.html");
      res.statusCode = 404;
      break;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.end(data);
    }
  });

});

server.listen(3000, () => {
  console.log("Success");
  console.log("Server started on: http://localhost:3000");
});