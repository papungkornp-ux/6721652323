// console.log('Hello form Backend/index.js');
const http = require('http');
const host = 'localhost';
const port = 8000;

const requiresten = function(req, res){
    res.writeHead(200);
    res.end('My first Server!');
}

const server = http.createServer(requiresten);
server.listen(port, host,()=>{
    console.log(`Sever is running at http://${host}:${port}`);
} );