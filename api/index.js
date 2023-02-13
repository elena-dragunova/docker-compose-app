const http = require("http");
const { Pool } = require('pg');

const host = '0.0.0.0';
const port = 8000;
 
const pool = new Pool({
    host: 'db',
    user: 'postgres',
    password: 'postgres',
    database: 'database',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

pool.connect();
pool.on('error', (err, client) => {
    console.error('Error:', err);
});

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
                pool.connect((err, client, done) => {
                    if (err) throw err;
                    client.query('SELECT * from users', (err, response) => {
                        done();
                        if (err) {
                            console.log(err.stack);
                        } else {
                            for (let row of response.rows) {
                                console.log(row);
                            }
                            res.writeHead(200, headers);
                            res.end(JSON.stringify(response.rows));
                        }
                    });
                });
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
});