const express = require('express');
const router = express.Router();
const db = require("../config/db.config");
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

// Insert a product
router.post('/product', function (req, res, next) {
    let product = req.body;
    db.query(
        'INSERT INTO Product SET ? ', product,
        (err, rows) => {
            if (err) throw err;
            else if (rows) res.send({
                success: true
            });
            else res.send({
                data: "Product Not Created",
                success: false
            });
        }
    );
});

// Get a product
router.get("/product/:productId", function (req, res, next) {
    const productId = req.params.productId;
    db.query(
        `SELECT * FROM Product where productId = '${productId}'`,
        (err, doc) => {
            db.query(
                `SELECT * FROM ACCOUNT where accID  = '${doc[0].sellerID}'`, (err, user) => {
                    doc[0].sellerID = user[0].NAME;
                    db.query(
                        `SELECT * FROM Categories where categoryID = '${doc[0].categoryID}'`, (err, category) => {
                            doc[0].categoryID = category[0].categoryName;
                            if (err) throw err;
                            else if (doc.length) res.send({
                                data: doc,
                                success: true
                            });
                            else res.send({
                                data: "Product Not Found",
                                success: false
                            });
                        })
                })
        }
    );
})

// Get product of a seller
router.get('/products/:sellerId', function (req, res, next) {
    const sellerId = req.params.sellerId;
    db.query(
        `SELECT * FROM Product where sellerId = '${sellerId}'`,
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

// Add comment
router.post('/comment', function (req, res, next) {
    const comment = req.body;
    db.query(
        'INSERT INTO COMMENT SET ? ', comment,
        (err, rows) => {
            if (err) throw err;
            else if (rows) res.send({
                success: true
            });
            else res.send({
                data: "Comment Not Set",
                success: false
            });
        }
    );
});

// Get comments of a product
router.get('/comment/:productId', function (req, res, next) {
    const productId = req.params.productId;
    db.query(
        `SELECT * FROM COMMENT where productId = '${productId}'`,
        (err, doc) => {
            if (err) throw err;
            else if (doc.length) res.send({
                data: doc,
                success: true
            });
            else res.send({
                data: "Comment Not Found",
                success: false
            });
        }
    );
});

// Get all comments for a user
router.get('/comments/:userId', function (req, res, next) {
    const userId = req.params.userId;
    db.query(
        `SELECT * FROM COMMENT where userID = ${userId}`,
        (err, doc) => {
            if (err) throw err;
            else if (doc.length) res.send({
                data: doc,
                success: true
            });
            else res.send({
                data: "Comments Not Found",
                success: false
            });
        }
    );
});

// Get all comments for a user
router.get('/user/:userId', function (req, res, next) {
    const userId = req.params.userId;
    db.query(
        `SELECT b.name FROM ACCOUNT a INNER JOIN COMMENT b ON a.accID = b.userID where b.userID = ${userId}`,
        (err, doc) => {
            if (err) throw err;
            else if (doc.length) res.send({
                data: doc,
                success: true
            });
            else res.send({
                data: "Username Not Found",
                success: false
            });
        }
    );
});

// Add To Bookmark
router.post('/bookmark', function (req, res, next) {
    const bookmark = req.body;
    db.query(
        'INSERT INTO Bookmark SET ? ', bookmark,
        (err, rows) => {
            if (err) throw err;
            else if (rows) res.send({
                success: true
            });
            else res.send({
                data: "Bookmark Not Set",
                success: false
            });
        }
    );
})

// Unbookmark
router.post('/bookmark', function (req, res, next) {
    const bookmark = req.body;
    db.query(
        `DELETE FROM BOOKMARK WHERE accID = ${bookmark.accID} AND productID = ${bookmark.productID}`, bookmark,
        (err, rows) => {
            if (err) throw err;
            else if (rows) res.send({
                success: true
            });
            else res.send({
                data: "Bookmark not deleted",
                success: false
            });
        }
    );
})

// Get Bookmark
router.get('/bookmark/:accID', function (req, res, next) {
    const accID = req.params.accID;
    db.query(
        `SELECT * FROM Bookmark where accID = ${accID}`,
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

// Make Offer
router.post('/offer', function (req, res, next) {
    const offer = req.body;
    db.query(
        'INSERT INTO Offer SET ? ', offer,
        (err, rows) => {
            if (err) throw err;
            else if (rows) res.send({
                success: true
            });
            else res.send({
                data: "Offer Not Set",
                success: false
            });
        }
    );
})

// Get all accepted offers by buyerID
router.get("/offersAcceptedBuyer/:sellerId", function (req, res, next) {
    const sellerId = req.params.sellerId;
    console.log(req.params)
    db.query(
        `SELECT * FROM Offer o INNER JOIN Product p ON o.productID = p.productID where isAccepted = 1 AND (o.buyerID = '${sellerId}' OR p.sellerID = '${sellerId}')`,
        (err, rows) => {
            if (err) throw err;
            else if (rows) res.send({
                data: rows,
                success: true
            });
            else res.send({
                data: "Category Not Set",
                success: false
            });
        }
    );
})

// Get all Offers that buyer accepts
router.get("/offerAcceptedSeller/:sellerId", function (req, res, next) {
    const sellerId = req.params.sellerId;
    db.query(
        `SELECT productId FROM Product where sellerId = '${sellerId}'`,
        (err, doc) => {
            if (err) throw err;
            else if (doc.length) {
                const ids = doc.map((value) => value.productId);
                db.query(
                    `SELECT * FROM Offer where isAccepted = 1 AND productId IN (${ids})`,
                    (err, doc) => {
                        if (err) throw err;
                        else if (doc.length) res.send({
                            data: doc,
                            success: true
                        });
                        else res.send({
                            data: "Offers Not Found",
                            success: false
                        });
                    }
                );
            }
            else res.send({
                data: "Products Not Found",
                success: false
            });
        }
    );
})

// Get all given offers which are not accepted
router.get("/offersGiven/:sellerId", function (req, res, next) {
    const sellerId = req.params.sellerId;
    db.query(
        `SELECT * FROM Offer where isAccepted = 0 AND buyerID = '${sellerId}'`,
        (err, rows) => {
            if (err) throw err;
            else if (rows) res.send({
                data: rows,
                success: true
            });
            else res.send({
                data: "Category Not Set",
                success: false
            });
        }
    );
})

// Get all Offers received
router.get("/offer/:sellerId", function (req, res, next) {
    const sellerId = req.params.sellerId;
    db.query(
        `SELECT productId FROM Product where sellerId = '${sellerId}'`,
        (err, doc) => {
            if (err) throw err;
            else if (doc.length) {
                const ids = doc.map((value) => value.productId);
                db.query(
                    `SELECT * FROM Offer where isAccepted = 0 AND productId IN (${ids})`,
                    (err, doc) => {
                        if (err) throw err;
                        else if (doc.length) res.send({
                            data: doc,
                            success: true
                        });
                        else res.send({
                            data: "Offers Not Found",
                            success: false
                        });
                    }
                );
            }
            else res.send({
                data: "Products Not Found",
                success: false
            });
        }
    );
})

// Add Categories
router.post('/category', function (req, res, next) {
    const category = req.body;
    db.query(
        'INSERT INTO Categories SET ? ', category,
        (err, rows) => {
            if (err) throw err;
            else if (rows) res.send({
                success: true
            });
            else res.send({
                data: "Category Not Set",
                success: false
            });
        }
    );
});

// Add Review
router.post('/review', function (req, res, next) {
    const review = req.body;
    db.query(
        'INSERT INTO userReview SET ? ', review,
        (err, rows) => {
            if (err) throw err;
            else if (rows) {
                if (review.Rating) {
                    db.query(`UPDATE ACCOUNT SET positiveReview = positiveReview + 1 WHERE accID = ${review.sellerID}`)
                }
                else {
                    db.query(`UPDATE ACCOUNT SET negativeReview = negativeReview + 1 WHERE accID = ${review.sellerID}`)
                }
                res.send({
                    success: true
                })
            }
            else res.send({
                data: "Review Not Set",
                success: false
            });
        }
    );
});

// Accept Offer
router.post('/acceptOffer', function (req, res, next) {
    const acceptOffer = req.body;
        db.query(`UPDATE Offer SET isAccepted = 1 WHERE productId = ${acceptOffer.productID}`,
          (err, rows) => {
              if (err) throw err;
              else if (rows) {
                  db.query(`UPDATE Product SET STATUS = 'sold' WHERE productId = ${acceptOffer.productID}`)
                  res.send ({
                    success: true
                  })
              } else {
                res.send({
                    data: "Something went wrong!",
                    success: false
                });
              }
          }
        );
});

// Rescind Offer
router.post('/rescindOffer', function (req, res, next) {
    const acceptOffer = req.body;
        db.query(`DELETE FROM Offer WHERE offerID = ${acceptOffer.offerID}`,
          (err, rows) => {
              if (err) throw err;
              else if (rows) {
                  res.send ({
                    success: true
                  })
              } else {
                res.send({
                    data: "Something went wrong!",
                    success: false
                });
              }
          }
        );
});

module.exports = router;
