const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// gets movies by related genre
router.get('/ByGenre/:genre', (req,res) => {
  const query =`SELECT * from movies
                Join movies_genres on movies.id = movies_genres.movie_id
                Join genres on movies_genres.genre_id = genres.id
                Where genres.id = $1; `
  pool.query(query, [req.params.genre])
    .then( result => {
      res.send(result.rows);
    })
    .catch (error => {
      console.log('ERROR: get by genre', error);
      res.sendStatus(500);
    })
})


router.get('/search/:like', (req, res)=>{
  console.log('fetching movie details by like title: ', req.params);
  const query = `SELECT * FROM movies WHERE UPPER(title) LIKE UPPER($1);`
  pool.query(query, ['%'+req.params.like+'%'])
    .then( result => {
      res.send(result.rows);
    })
    .catch(err =>{
      console.log('ERROR: get movie details',err);
      res.sendStatus(500);
    })
})

router.get('/details/:id', (req, res)=>{
  console.log('fetching mvie details by id: ', req.params.id);
  const query = `SELECT "movies"."id", "movies"."title", "movies"."poster","movies"."description", json_agg("genres"."name") AS "genre_array"
  From "genres"
  Join "movies_genres" ON "movies_genres"."genre_id" = "genres"."id"
  Join "movies" ON "movies"."id" = "movies_genres"."movie_id"
  WHERE "movies"."id" = $1
  Group by "movies"."title","movies"."poster","movies"."id", "movies"."description";`
  pool.query(query, [req.params.id])
    .then( result => {
      res.send(result.rows);
    })
    .catch(err =>{
      console.log('ERROR: get movie details',err);
      res.sendStatus(500);
    })
})

router.get('/', (req, res) => {

  const query = `SELECT "movies"."id", "movies"."title", "movies"."poster","movies"."description", json_agg("genres"."name") AS "genre_array"
                  From "genres"
                  Join "movies_genres" ON "movies_genres"."genre_id" = "genres"."id"
                  Join "movies" ON "movies"."id" = "movies_genres"."movie_id"
                  Group by "movies"."title","movies"."poster","movies"."id", "movies"."description"
                  Order by 1;`;
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })

});

router.post('/', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description", "trailerURL")
  VALUES ($1, $2, $3, $4)
  RETURNING "id";`

  // FIRST QUERY MAKES MOVIE
  pool.query(insertMovieQuery, [req.body.title, req.body.poster, req.body.description, req.body.trailerURL])
  .then(result => {
    console.log('New Movie Id:', result.rows[0].id); //ID IS HERE!
    
    const createdMovieId = result.rows[0].id

    // Now handle the genre reference
    const insertMovieGenreQuery = `
      INSERT INTO "movies_genres" ("movie_id", "genre_id")
      VALUES  ($1, $2);
      `
      // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
      pool.query(insertMovieGenreQuery, [createdMovieId, req.body.genre_id]).then(result => {
        //Now that both are done, send back success!
        res.sendStatus(201);
      }).catch(err => {
        // catch for second query
        console.log(err);
        res.sendStatus(500)
      })

// Catch for first query
  }).catch(err => {
    console.log(err);
    res.sendStatus(500)
  })
})

module.exports = router;