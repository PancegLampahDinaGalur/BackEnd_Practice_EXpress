// menambahkan core module dari third party(nodemon)
const os = require("os");
const fs = require("fs");

//menambahkan local module
const luasSegitiga = require("./luasSegitiga")

// fs merupakan (file system)
// function fs untuk membuat file
fs.writeFileSync("text.txt", "整瑳", "utf-16le" );
//function fs untuk read 
const data = fs.readFileSync("text.txt", "utf-8") // utf-8 merupakan salah satu format pembacaan format dunia 



console.log("hello")
console.log(os.hostname())
console.log(os.freemem())
console.log(os.networkInterfaces())
console.log(os.cpus())
console.log(luasSegitiga(2,3))
console.log(data)

