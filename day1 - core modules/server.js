const path = require("path");
const fs = require("fs");
const os = require("os");
const http = require("http");

try {
  //make the root lvl files
  const rootCss = path.join(__dirname, "style.css");
  fs.writeFileSync(rootCss, "body { background-color: red;}");
  const rootIndex = path.join(__dirname, "index.html");
  fs.writeFileSync(rootIndex, "<head> <link rel='stylesheet' href='style.css'></head>");
  fs.appendFileSync(rootIndex, "<h1> index html root folder</h1>");

} catch (err) {
  console.error("Error on root, code :", err.code);
  console.error(err.message);
}

try {
  //make contact folder + files
  fs.mkdirSync(path.join(__dirname, "contact"));
  const contactCss = path.join(__dirname, "contact", "style.css");
  fs.writeFileSync(contactCss, "body { background-color: blue;}");
  const contactIndex = path.join(__dirname, "contact", "index.html");
  fs.writeFileSync(contactIndex, "<head> <link rel='stylesheet' href='style.css'></head>");
  fs.appendFileSync(contactIndex, "<h1> index html Contact folder </h1>");
} catch (err) {
  console.error("Error at 'contact', code :", err.code);
  console.error(err.message);
}

try {
  //make about folder + files
  fs.mkdirSync(path.join(__dirname, "about"));
  const aboutCss = path.join(__dirname, "about", "style.css");
  fs.writeFileSync(aboutCss, "body { background-color: green;}");
  const aboutIndex = path.join(__dirname, "about", "index.html");
  fs.writeFileSync(aboutIndex, "<head> <link rel='stylesheet' href='style.css'></head>");
  fs.appendFileSync(aboutIndex, "<h1> Index html About folder </h1>");
} catch (err) {
  console.error("Error at about, code :", err.code);
  console.error(err.message);
}

try {
  //make blog folder + files
  fs.mkdirSync(path.join(__dirname, "blog"));
  const blogCss = path.join(__dirname, "blog", "style.css");
  fs.writeFileSync(blogCss, "body { background-color: green;}");
  const blogIndex = path.join(__dirname, "blog", "index.html");
  fs.writeFileSync(blogIndex, "<head> <link rel='stylesheet' href='style.css'></head>");
  fs.appendFileSync(blogIndex, "<h1> Index html blog folder </h1>");
} catch (err) {
  console.error("Error at blog, code :", err.code);
  console.error(err.message);
}

try {
  //add OS module + os.txt
  const contactOs = path.join(__dirname, "contact", "os.txt");
  const content = "This is being run on a " + os.type() + " computer! ";
  fs.writeFileSync(contactOs, content);
} catch (err) {
  console.error("Error at os.txt, code :", err.code);
  console.error(err.message);
}
