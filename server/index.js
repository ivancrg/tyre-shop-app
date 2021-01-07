const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cruddatabase'
});

app.use(cors());
app.use(express.json()); //grabbing info from frontend as json
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/get', (req, res) => {
    console.log('Running on 3001/api/get');
    
    const sqlSelect = "SELECT * FROM movie_reviews";

    db.query(sqlSelect, (err, result) => {
        res.send(result);
        console.log('Result: '); console.log(result);
        console.log('Error: '); console.log(err);
    });
});

app.post('/api/insert', (req, res) => {
    console.log('Running on 3001/api/insert');
    const movieName = req.body.movieName; //varijabla iz App.js
    const movieReview = req.body.movieReview; //varijabla iz App.js

    const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?, ?)";

    db.query(sqlInsert, /*polje zamijenit ? u sqlInsert*/ [movieName, movieReview], (err, result) => {
        console.log('Result: '); console.log(result);
        console.log('Error: '); console.log(err);
    });
});

app.delete('/api/delete/:movieID', (req, res) => {
    console.log('Running on 3001/api/delete');

    const id = req.params.movieID; //varijabla iz App.js
    
    const sqlDelete = "DELETE FROM movie_reviews WHERE id = ?";
    
    db.query(sqlDelete, id, (err, result) => {
        console.log('Result: '); console.log(result);
        console.log('Error: '); console.log(err);
    });
});

app.put('/api/update', (req, res) => {
    console.log('Running on 3001/api/update');

    const id = req.body.movieID;
    const review = req.body.movieReview;
    
    const sqlUpdate = "UPDATE movie_reviews SET movieReview = ? WHERE id = ?";

    db.query(sqlUpdate, [review, id], (err, result) => {
        console.log('Result: '); console.log(result);
        console.log('Error: '); console.log(err);
    });
});

app.listen(3001, () => {
    console.log('Running on port 3001');
});