const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const host = "127.0.0.1";
const port = Number.parseInt(process.env.PORT || "4000", 10);

const server = http.createServer((request, response) => {
  if (request.method === "GET" && request.url === "/health") {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ status: "ok" }));
    return;
  }

  const pages = {
    "/": "index.html",
    "/index.html": "index.html",
    "/carta-testamento.html": "carta-testamento.html",
    "/poems.html": "poems.html"
  };

  if (request.method === "GET" && pages[request.url]) {
    const pagePath = path.join(__dirname, pages[request.url]);
    const pageHtml = fs.readFileSync(pagePath, "utf8");
    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    response.end(pageHtml);
    return;
  }

  if (request.method === "GET" && request.url === "/public/rigoberto.jpeg") {
    const imagePath = path.join(__dirname, "public", "rigoberto.jpeg");
    const image = fs.readFileSync(imagePath);

    response.writeHead(200, { "Content-Type": "image/jpeg" });
    response.end(image);
    return;
  }

  if (request.method === "GET" && request.url === "/public/paperofpoem.webp") {
    const imagePath = path.join(__dirname, "public", "paperofpoem.webp");
    const image = fs.readFileSync(imagePath);

    response.writeHead(200, { "Content-Type": "image/webp" });
    response.end(image);
    return;
  }

  response.writeHead(404, { "Content-Type": "application/json" });
  response.end(JSON.stringify({ error: "Not found" }));
});

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});
