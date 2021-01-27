const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const saltRounds = 10; //konstanta za hashiranje
const cookieParser = require("cookie-parser");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "tyre-shop-app",
});

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json()); //grabbing info from frontend as json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  session({
    key: "userID", //ime cookiea koji radimo
    secret: "subscribe", //moramo pazit s ovom, nitko ju ne bi smio znati
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 15 * 60 * 1000, //istek cookiea nakon 15min
    },
  })
);
app.use(
  fileUpload({
    createParentPath: true,
  })
);
app.use(morgan("dev"));

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"]; //uzimamo jwt kroz header

  if (!token) {
    //res.send("Hey, I need a token!");
    res.send(false);
  } else {
    jwt.verify(token, "jwtSecret", (err, decoded) => {
      if (err) {
        //res.json({ auth: false, message: "You failed to authenticate!" });
        res.send(false);
      } else {
        req.userID = decoded.id;
        next();
      }
    });
  }
};

// app.post("/register", (req, res) => {
//   const username = req.body.username;
//   const password = req.body.password;

//   bcrypt.hash(password, saltRounds, (err, hash) => {
//     if (err) {
//       console.log(err);
//     } else {
//       const sqlInsert = "INSERT INTO users (username, password) VALUES (?, ?)";

//       db.query(sqlInsert, [username, hash], (err, result) => {
//         //console.log('Result: '); console.log(result);
//         console.log("Error: ");
//         console.log(err);
//       });
//     }
//   });
// });

// app.get("/isAuth", verifyJWT, (req, res) => {
//   //res.send("hey, you are authenticated.");
//   res.send(true);
// });

app.get("/logout", verifyJWT, (req, res) => {
  req.session.destroy();
  res.send(true);
});

app.get("/login", verifyJWT, (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const sqlSelect = "SELECT * FROM users WHERE username = ?";

  db.query(sqlSelect, username, (err, result) => {
    //console.log('Result: '); console.log(result);
    console.log("Error:");
    console.log(err);

    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        if (response) {
          //dobri podaci, prije res.send stvaramo sesiju koja se zove user koju ćemo kasnije pozivati
          //JWT
          const id = result[0].idusers;
          const token = jwt.sign({ id }, "jwtSecret", {
            expiresIn: 15 * 60, //istječe za 15min
          }); //jwtSecret treba inače biti u .env (ne objaviti bez toga)
          req.session.user = result;

          res.json({ auth: true, token: token, result: result[0].username }); //autorizirano, nije autentificirano, šaljemo mu token za autentifikaciju
        } else {
          //krivi password
          res.json({ auth: false, message: "Provjerite unesene podatke." });
        }
      });
    } else {
      //krivi username (mozda i pwd)
      res.json({ auth: false, message: "Provjerite unesene podatke (KNP)." });
    }
  });
});

app.post("/api/sendMail", (req, res) => {
  console.log(req.body.email);
  console.log(req.body.subject);
  console.log(req.body.message);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "test.rwa.riteh@gmail.com",
      pass: "&RWA!RITEH=",
    },
  });

  const mailOptions = {
    from: req.body.email,
    to: "test.rwa.riteh@gmail.com",
    subject:
      "Poruka od osobe " +
      req.body.first_name +
      " " +
      req.body.last_name +
      ", e-mail: " +
      req.body.email,
    text:
      "Predmet: " +
      req.body.subject +
      "\n##########################\n\n" +
      req.body.message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("error");
    } else {
      console.log("E-mail sent: " + info.response);
      res.send("success");
    }
  });
});

app.post("/api/sendNotification", (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "test.rwa.riteh@gmail.com",
      pass: "&RWA!RITEH=",
    },
  });

  const mailOptions = {
    from: "test.rwa.riteh@gmail.com",
    to: req.body.email,
    subject: req.body.subject,
    text: req.body.message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("error");
    } else {
      console.log("E-mail sent: " + info.response);
      res.send("success");
    }
  });
});

app.put("/api/updateNotification", (req, res) => {
  console.log("Running on 3001/api/updateNotification");

  const receipt = req.body.receipt;
  const notification_mode = req.body.notification_mode;
  const notification_interval = req.body.notification_interval;

  const sqlSelect = "SELECT idorder FROM orders WHERE receipt_no = ?";
  db.query(sqlSelect, receipt, (error, result) => {
    if (error || result.length < 1) {
      console.log(error);
      res.send(false);
      return;
    } else {
      const sqlUpdate =
        "UPDATE orders SET notification_mode = ?, notification_interval = ? WHERE receipt_no = ?";

      db.query(
        sqlUpdate,
        [notification_mode, notification_interval, receipt],
        (error, result) => {
          // console.log("Result: ");
          // console.log(result);
          // console.log("Error: ");
          // console.log(err);
          if (error) {
            console.log(error);
            res.send(false);
          } else {
            res.send(true);
          }
        }
      );
    }
  });
});

app.post("/api/insertOffer", (req, res) => {
  console.log("Running on 3001/api/insertOffer");

  try {
    if (!req.files || !req.body) {
      res.send({
        status: false,
        message: "Došlo je do greške", //"No files/body.",
      });
    } else {
      //SPREMANJE SLIKE
      const { picture } = req.files;
      picture.mv("../client/public/images/" + picture.name);
      picture.mv("../client/src/images/" + picture.name);

      //UNOS PODATAKA U BAZU
      const img_src = "../images/" + picture.name;
      const img_alt = req.body.img_alt;
      const tyre_path = "/" + req.body.name;
      const name = req.body.name;
      const data = req.body.data;
      const price = req.body.price;

      const sqlInsert =
        "INSERT INTO offers (img_src, img_alt, tyre_path, name, data, price) VALUES (?, ?, ?, ?, ?, ?)";

      db.query(
        sqlInsert,
        [img_src, img_alt, tyre_path, name, data, price],
        (error, result) => {
          if (error) {
            console.log(error);
          }
        }
      );

      res.send({
        status: true,
        message: "Nova ponuda unesena.",
      });
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

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

app.get("/api/getQuestions", (req, res) => {
  console.log("Running on 3001/api/getQuestions");

  const sqlSelect = "SELECT * FROM questions";

  db.query(sqlSelect, (err, result) => {
    res.send(result);
    console.log("Error: " + err);
  });
});

app.put("/api/setQuestionsOpen", (req, res) => {
  console.log("Running on 3001/api/setQuestionsOpen");

  const id = req.body.id;
  const open = req.body.open;

  const sqlUpdate = "UPDATE questions SET open = ? WHERE id = ?";

  db.query(sqlUpdate, [open, id], (err, result) => {
    console.log("Error: " + err);
  });
});

app.get("/api/getAppointments", (req, res) => {
  console.log("Running on 3001/api/getAppointments");

  const sqlSelect = "SELECT * FROM orders";

  db.query(sqlSelect, (err, result) => {
    //console.log("Result: ");
    //console.log(result);
    console.log("Error: ");
    console.log(err);

    res.send(result);
  });
});

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

app.listen(3001, () => {
  console.log("Running on port 3001");
});
