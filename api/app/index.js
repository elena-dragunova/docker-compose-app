const http = require("http");

const host = '0.0.0.0';
const port = 8000;

const requestListener = function (req, res) {
    const headers = {
        "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Access-Control-Allow-Headers': 'Content-Type',
    }
    if (req.method === 'OPTIONS') {
        res.writeHead(200, headers);
        res.end();
    } else {
        res.setHeader("Content-Type", "application/json");
        switch (req.url) {
            case "/auth/login":
                res.writeHead(200, headers);
                res.end('Login request');
                break;
            default:
                res.writeHead(404, headers);
                res.end(JSON.stringify({error:"Resource not found"}));
        }
    }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
})