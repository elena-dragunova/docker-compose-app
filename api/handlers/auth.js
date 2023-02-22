class Auth {
    static login(request, response, pool, headers) {
        let reqBody;
        request.on('data', function (chunk) {
            reqBody = JSON.parse(chunk.toString());
        });

        pool.connect((err, client, done) => {
            if (err) throw err;
            client.query('SELECT * from users', (err, res) => {
                done();
                if (err) {
                    console.log(err.stack);
                } else {
                    const users = res.rows;
                    const user = users.find(user => user.email === reqBody.email && user.password === reqBody.password);
                    if (user) {
                        response.writeHead(200, headers);
                        response.end(users);
                    } else {
                        response.writeHead(404, headers);
                        response.end(JSON.stringify({error:"Wrong email or password"}));
                    }
                }
            });
        });
        response.writeHead(200, headers);
        response.end();
    }
}
  
module.exports = Auth;