var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'images'
});

var selectAll = function(callback) {
  connection.query('SELECT * FROM items', function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

var insert = function(photo, callback) {
  connection.query(`INSERT INTO plants (title, description, link, category) VALUES('${photo.title}', 'stupid thing', '${photo.link}', '${photo.category}')`, (err, res) => {
    if(err) {
      callback(err, null);
    } else {
      callback(null, res);
    }
  })
}

module.exports = {
  selectAll: selectAll,
  insert: insert
}
