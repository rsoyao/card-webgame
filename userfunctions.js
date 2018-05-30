const login = function(name, password, database, cb) {
    console.log('user func', name, password);
    let userQuery = { name: name }

    database.collection('data').find(userQuery).toArray(function(err, result) {
        if (err) throw err

        let storedPassword = result[0].password;
        if (storedPassword === password) {
            cb(true);
        } else {
            cb(false);
        }
    });
}

const register = function(name, password, database) {
    let user = {
        "name": name,
        "password": password
    }

    database.collection('data').insertOne(user, function(err, res) {
        if (err) throw err;
        console.log('1 document inserted');
    })
}
module.exports = {
    login: login,
    register: register
};