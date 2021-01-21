const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "tyre-shop-app",
});

app.use(cors());
app.use(express.json()); //grabbing info from frontend as json
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/getOffers", (req, res) => {
  console.log("Running on 3001/api/getOffers");

  const sqlSelect = "SELECT * FROM offers";

  db.query(sqlSelect, (err, result) => {
    res.send(result);
    //console.log("Result: ");
    //console.log(result);
    console.log("Error: ");
    console.log(err);
  });
});

app.get("/api/getAppointments", (req, res) => {
  console.log("Running on 3001/api/getAppointments");

  const sqlSelect = "SELECT * FROM orders";

  db.query(sqlSelect, (err, result) => {
    res.send(result);
    //console.log("Result: ");
    //console.log(result);
    console.log("Error: ");
    console.log(err);
  });
});

app.get("/api/getQuestions", (req, res) => {
  console.log("Running on 3001/api/getQuestions");

  const sqlSelect = "SELECT * FROM questions";

  db.query(sqlSelect, (err, result) => {
    res.send(result);
    console.log("Error: " + err);
  })
})

app.put("/api/setQuestionsOpen", (req, res) => {
  console.log("Runnin on 3001/api/setQuestionsOpen");

  const id = req.body.id;
  const open = req.body.open;

  const sqlUpdate = "UPDATE questions SET open = ? WHERE id = ?";
  
  db.query(sqlUpdate, [open, id], (err, result) => {
    console.log("Error: " + err);
  })
})

app.delete("/api/deleteAppointment/:idOrder", (req, res) => {
  console.log("Running on 3001/api/deleteAppointment");

  const id = req.params.idOrder;
  console.log(id);

  const sqlDelete = "DELETE FROM orders WHERE idorder = ?";

  db.query(sqlDelete, id, (err, result) => {
    //console.log("Result: ");
    //console.log(result);
    console.log("Error: ");
    console.log(err);
  });
});

app.put("/api/editAppointment", (req, res) => {
  console.log("Running on 3001/api/editAppointment");

  const id = req.body.id;
  const appointment = req.body.newAppointment;
  const receipt = req.body.receipt;

  if (receipt === "") {
    const sqlUpdate =
      "UPDATE orders SET service_date_time = ? WHERE idorder = ?";
    db.query(sqlUpdate, [appointment, id], (err, result) => {
      //console.log("Result: "); console.log(result);
      console.log("Error: ");
      console.log(err);
    });
  } else {
    const sqlUpdate =
      "UPDATE orders SET service_date_time = ?, receipt_no = ? WHERE idorder = ?";
    db.query(sqlUpdate, [appointment, receipt, id], (err, result) => {
      //console.log("Result: "); console.log(result);
      console.log("Error: ");
      console.log(err);
    });
  }
});

app.post("/api/insertAppointment", (req, res) => {
  console.log("Running on 3001/api/insert");
  const buyer_name = req.body.buyer_name;
  const buyer_surname = req.body.buyer_surname;
  const offer_code = req.body.offer_code;
  const quantity = req.body.quantity;
  const e_mail = req.body.e_mail;
  const phone_no = req.body.phone_no;
  const comments = req.body.comments;
  const tyre_dimension = req.body.tyre_dimension;

  const sqlInsert =
    "INSERT INTO orders (buyer_name, buyer_surname, offer_code, quantity, e_mail, phone_no, comments, tyre_dimension) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

  db.query(
    sqlInsert,
    /*polje zamijenit ? u sqlInsert*/ [
      buyer_name,
      buyer_surname,
      offer_code,
      quantity,
      e_mail,
      phone_no,
      comments,
      tyre_dimension,
    ],
    (err, result) => {
      //console.log('Result: '); console.log(result);
      console.log("Error: ");
      console.log(err);
    }
  );
});

// app.delete('/api/delete/:movieID', (req, res) => {
//     console.log('Running on 3001/api/delete');

//     const id = req.params.movieID; //varijabla iz App.js

//     const sqlDelete = "DELETE FROM movie_reviews WHERE id = ?";

//     db.query(sqlDelete, id, (err, result) => {
//         console.log('Result: '); console.log(result);
//         console.log('Error: '); console.log(err);
//     });
// });

// app.put('/api/update', (req, res) => {
//     console.log('Running on 3001/api/update');

//     const id = req.body.movieID;
//     const review = req.body.movieReview;

//     const sqlUpdate = "UPDATE movie_reviews SET movieReview = ? WHERE id = ?";

//     db.query(sqlUpdate, [review, id], (err, result) => {
//         console.log('Result: '); console.log(result);
//         console.log('Error: '); console.log(err);
//     });
// });

app.listen(3001, () => {
  console.log("Running on port 3001");
});
