const User = require('../services/user-service');

class Auth {
    static login(request, response, pool, headers) {
        let reqBody;
        request.on('data', function (chunk) {
            reqBody = JSON.parse(chunk.toString());
        });

        request.on('end', function() {
            const users = User.findByCredentials(pool, reqBody.email, reqBody.password);
            if (users.length > 0) {
                response.writeHead(200, headers);
                response.end();
            } else {
                response.writeHead(404, headers);
                response.end(JSON.stringify({error:'Wrong email or password'}));
            }
        });
    }
}
  
module.exports = Auth;