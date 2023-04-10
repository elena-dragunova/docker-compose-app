class Auth {
    static login(request, response, pool, headers) {
        let reqBody;
        request.on('data', function (chunk) {
            reqBody = JSON.parse(chunk.toString());
        });

        pool.connect((err, client, done) => {
            if (err) throw err;
            client.query(`SELECT * from users WHERE email='${reqBody.email}' AND password='${reqBody.password}'`, (err, res) => {
                done();
                if (err) {
                    console.log(err.stack);
                } else {
                    if (res.rows.length > 0) {
                        response.writeHead(200, headers);
                        response.end();
                    } else {
                        response.writeHead(404, headers);
                        response.end(JSON.stringify({error:'Wrong email or password'}));
                    }
                }
            });
        });
    }
}
  
module.exports = Auth;