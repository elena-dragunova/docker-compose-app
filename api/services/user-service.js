class User {
    static findByCredentials(pool, email, password) {
        pool.connect((err, client, done) => {
            console.log('connect');
            if (err) {
                return console.error('Error acquiring client', err.stack);
            };
            client.query(`SELECT * from users WHERE email='${email}' AND password='${password}'`, (err, res) => {
                done();
                console.log(res);
                if (err) {
                    console.log('error');
                    console.log(err.stack);
                    return [];
                } else {
                    return res.rows;
                }
            });
        });
    }
}
  
module.exports = User;