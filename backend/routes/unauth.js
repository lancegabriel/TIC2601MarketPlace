const express = require('express');
const router = express.Router();
const db = require("../config/db.config");
const jwt = require('jsonwebtoken');

// Server Hearteat Test
router.get("/", (req, res) => {
  return res.send("Server is Running");
})

// Login user account
router.post('/login', function (req, res, next) {
  const { username, password } = req.body;
  db.query(
    `SELECT * FROM ACCOUNT WHERE username = '${username}' AND PASSWORD = '${password}'`,
    (err, rows) => {
      if (err) res.send({
        data: "Not Login",
        success: false
      });
      else if (rows) {
        if (rows.length === 0) {
          res.send({
            data: "Not Login",
            success: false
          });
        }
        else {
          const token = 'Bearer ' + jwt.sign({
            accID: rows[0].accID
          }, 'secret', { expiresIn: '5h' });
          res.send({
            data: rows,
            token,
            success: true
          })
        }
      }
      else res.send({
        data: "Not Login",
        success: false
      });
    }
  );
});

// Creating user account
router.post('/signup', function (req, res, next) {
  const account = req.body;
  db.query('INSERT INTO ACCOUNT SET ? ', account, (err, data) => {
    if (err) res.send({
      data: "Not Signup",
      success: false
    });
    else if (data) {
      db.query(
        `SELECT * FROM ACCOUNT WHERE username = '${account.username}'`,
        (err, rows) => {
          if (err) res.send({
            data: "Not Signup",
            success: false
          });
          else if (rows) {
            if (rows.length === 0) {
              res.send({
                data: "Not Signup",
                success: false
              });
            }
            else {
              const token = 'Bearer ' + jwt.sign({
                accID: rows[0].accID
              }, 'secret', { expiresIn: '5h' });
              res.send({
                data: rows,
                token,
                success: true
              })
            }
          }
          else res.send({
            data: "Not Signup",
            success: false
          });
        }
      )
    }
    else res.send({
      data: "Not Signup",
      success: false
    })
  });
});

// Get all products
router.get('/product', function (req, res, next) {
  db.query(
    'SELECT * from Product ORDER BY productID DESC ',
    (err, doc) => {
      if (err) throw err;
      else if (doc.length) res.send({
        data: doc,
        success: true
      });
      else res.send({
        data: "Products Not Found",
        success: false
      });
    }
  );
});

// Get Categories 
router.get('/category', function (req, res, next) {
  db.query(
    'SELECT * from Categories',
    (err, data) => {
      if (err) throw err;
      else if (data) res.send({
        data,
        success: true
      });
      else res.send({
        data: "Category Not Found",
        success: false
      });
    }
  );
});


module.exports = router;
