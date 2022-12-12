const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
  // Add query to get all genres
  const query = `SELECT * FROM movies_genres`
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch (error => {
      console.log(error);
      res.sendStatus(500);
    })
});

module.exports = router;