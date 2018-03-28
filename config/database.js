var mysql      = require('mysql');
var config;
config = {
    mysql_pool : mysql.createPool({
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'etna-crowding'
    })
};

module.exports = config;
