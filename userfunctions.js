const login = function(name, password, database, cb) {
    console.log('user func', name, password);
    let userQuery = {
            name: name
        }
        // make err the first parameter of the callback
    database.collection('data').find(userQuery).toArray(function(err, result) {
        if (err) throw err
        console.log('result', result);

        let storedPassword = result[0].password;
        console.log('stored', storedPassword, "ppp", password)
        if (storedPassword == password) {
            console.log('this should be an id', result[0]._id);
            cb(true, result[0]._id);
        } else {
            cb(false);
        }
    });
}
const register = function(name, password, database, cb) {
    let user = {
        "name": name,
        "password": password
    }
    database.collection('data').insertOne(user, function(err, res) {
        //get id that it inserts with and put that witht the cookie. get that mongo id back and assign that to the cookie
        //query based on the unique id. saerch by name and password. put res.opID in the cookie. send function taht way to put it in a cookie with a CALLBACK
        //

        if (err) throw err;
        console.log('1 document inserted');

        cb(res.insertedId)
    })
}
module.exports = {
    login: login,
    register: register
};