var express = require('express');
var router = express.Router();
var database = require('../config/database.js').mysql_pool;

router.get('/', function(req, res, next) {
	database.getConnection(function (err, connection) {
        connection.query('SELECT id, slug, name, description FROM domain', function (error, results, fields) {
			if (error) throw error;
			res.status(200);
			res.json({"code": 200, "message": "success", "datas": results});
		});
    });
});

module.exports = router;
