const express = require('express');
const router = express.Router();
const db = require("../config/db.config");
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

// Insert a product
router.post('/product', upload.single('image'), function (req, res, next) {
    let product = req.body;
    product.image = req.file.path;
    db.query(
        'INSERT INTO Product SET ? ', product,
        (err, rows) => {
            if (err) throw err;
            else if (rows) res.send({
                success: true
            });
            else res.send({
                data: "Product Not Set",
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

// Get all Offer
router.get("/offer/:sellerId", function (req, res, next) {
    const sellerId = req.params.sellerId;
    db.query(
        `SELECT productId FROM Product where sellerId = '${sellerId}'`,
        (err, doc) => {
            if (err) throw err;
            else if (doc.length) {
                const ids = doc.map((value) => value.productId);
                db.query(
                    `SELECT * FROM Offer where productId IN (${ids})`,
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


module.exports = router;
