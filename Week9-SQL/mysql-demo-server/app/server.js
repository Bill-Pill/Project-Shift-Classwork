const express = require('express');
const app = express();
var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ratings'
});

app.get('/movie', (req, res) => {
  // Helper function builds the WHERE query with values given req.query
  const buildConditions = query => {
    let conditions = [];
    let values = [];

    if (query.before) {
      conditions.push("year < ?");
      values.push(parseInt(query.before))
    }

    if (query.title) {
      conditions.push("title LIKE ?");
      values.push('%' + query.title + '%')
    }

    return {
      where: conditions.length ?
        conditions.join(' AND ') : '1',
      values: values
    }
  }
  const conditions = buildConditions(req.query);

  pool.query('SELECT * FROM `Movie` WHERE ' + conditions.where, conditions.values,
    function(error, results, fields) {
      // error will be an Error if one occurred during the query
      if (error) throw error;

      // results will contain the results of the query
      res.json(results);
      // fields will contain information about the returned results fields (if any)
    });
});

app.get('/reviewer', (req, res) => {

  // Helper function builds the WHERE query with values given req.query
  const buildConditions = query => {
    let conditions = [];
    let values = [];

    if (query.name) {
      conditions.push("name LIKE ?");
      values.push('%' + query.name + '%')
    }

    return {
      where: conditions.length ?
        conditions.join(' AND ') : '1',
      values: values
    }
  }
  const conditions = buildConditions(req.query);

  pool.query('SELECT * FROM `Reviewer` WHERE ' + conditions.where, conditions.values,
    function(error, results, fields) {
      // error will be an Error if one occurred during the query
      if (error) throw error;

      // results will contain the results of the query
      res.json(results);
      // fields will contain information about the returned results fields (if any)
    });
});

app.use((req, res) => {
  res.status(404)
    .send('404 error! Resource not found.');
});

app.listen(8000);