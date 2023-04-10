const http = require('http');
const fs = require('fs');
const url = require('url');
const { Pool } = require('pg');
const Router = require('./router');

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

class Server {
    static start() {
        this.createServer();
    }
  
    static createServer() {
        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
            'Access-Control-Allow-Headers': 'Content-Type',
        }

        http.createServer(function(request, response) {
            if (request.method === 'OPTIONS') {
                response.writeHead(200, headers);
                response.end();
            } else {
                const path = url.parse(request.url).pathname;
                const route = Router.find(path);
                try {
                    const handler = require('./handlers/' + route.handler);
                    handler[route.action](request, response, pool, headers);
                } catch(e) {
                    response.writeHead(500, headers);
                    response.end();
                }
            }
        }).listen(port);
    }
}

Server.start();