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


// Admin get num of prod sold per seller
router.get("/admin/getNumOfProdSold", function (req, res, next) {
  db.query(
      `SELECT accID, name, COUNT(productID) AS countProducts FROM ACCOUNT a, Product p WHERE STATUS = "sold" AND a.accID = p.sellerID GROUP by accID ORDER BY COUNT(productID) DESC`,
      (err, doc) => {
          if (err) throw err;
          else if (doc.length) res.send({
              data: doc,
              success: true
          });
          else res.send({
              data: "Bookmarks Not Found",
              success: false
          });
      }
  );
});

// List the categories with highest transaction value in descending order
router.get("/admin/getNumOfProdSold", function (req, res, next) {
  db.query(
      `SELECT categoryName, SUM(unitPrice) AS sumUnitPrice FROM Categories c, Product p WHERE c.categoryID = p.categoryID AND status = "sold" GROUP BY categoryName ORDER BY SUM(unitPrice) DESC`,
      (err, doc) => {
          if (err) throw err;
          else if (doc.length) res.send({
              data: doc,
              success: true
          });
          else res.send({
              data: "Bookmarks Not Found",
              success: false
          });
      }
  );
});

// Check offer range of products in categories
router.get("/admin/getRangeOfProds", function (req, res, next) {
  db.query(
      `SELECT categoryName, MIN(priceOffered) AS minPriceOffered, MAX(priceOffered) AS maxPriceOffered FROM Categories c, Offer o, Product p WHERE o.productID = p.productID GROUP BY categoryName`,
      (err, doc) => {
          if (err) throw err;
          else if (doc.length) res.send({
              data: doc,
              success: true
          });
          else res.send({
              data: "Bookmarks Not Found",
              success: false
          });
      }
  );
});
module.exports = router;
