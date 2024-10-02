const http = require("http");
const fs = require("fs");
const url = require('url')

const cars = require("./cars.json");

function onRequest(request, response) {
    const data = fs.readFileSync("cars.json", "utf-8")
    const q = url.parse(request.url, true).query;
    const dataParse = JSON.parse(data);

    const search = q.name? 
        dataParse.cars.find((el) => el.name == q.name) : dataParse; 

    response.writeHead(200, {
        "Content-Type" : "application/json"
    })
    response.write(JSON.stringify(search))
    console.log(q)
    response.end();
}

const server = http.createServer(onRequest);

server.listen(3000); 



