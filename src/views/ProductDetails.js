import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { connect, useDispatch } from 'react-redux';
import { useHistory } from "react-router";
import ProductImage from "../components/product.png";
import Grid from "@material-ui/core/Grid";
import Bookmarks from "../components/Bookmarks";
import Button from "@material-ui/core/Button";
import Comment from "../components/UserComment";
import { getProductDetails } from "../actions/productDetails";
import { getProductComments } from "../actions/productComments";
import { postUserBookmarks } from "../actions/bookmarks";
import { postUserComments } from "../actions/comments";
import { postUserOffers } from "../actions/offers";
import Modal from "../components/Modal";
import moment from "moment";

const ProductDetails = ({ logins, postUserOffers, postUserComments, postUserBookmarks, getProductDetails, productDetails, getProductComments, productComments }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [openComment, setComment] = useState(false);
    const [openOffer, setOffer] = useState(false);
    useEffect(() => {
        const productId = history.location.state.product.productID;
        getProductDetails(logins?.data.token, productId);
        getProductComments(logins?.data.token, productId);
    }, [history, getProductDetails, getProductComments]);

    const postBookmark = () => {
        const productId = history.location.state.product.productID;
        postUserBookmarks(logins.data.token, {
            "accID": logins.data.data[0].accID,
            "productID": productId
        })
        alert("Product Bookmarked");
    }

    const handleClose = () => {
        setComment(false);
        setOffer(false);
    }

    const handleComment = () => {
        setComment(true);
    }

    const handleOffer = () => {
        setOffer(true);
    }

    const modalComment = () => {
        return (<div id="modalComment">
            <p>Please enter your comment:</p>
            <textarea rows="8" cols="50" id="comment" placeholder="Type your questions or comments here..."></textarea><br/>
            <Button size="small" variant="contained" style={{ backgroundColor: "black", color: "white" }} onClick={() => {
                postUserComments(logins.data.token, {
                    "productID": history.location.state.product.productID,
                    "userID": logins.data.data[0].accID,
                    "COMMENT": document.getElementById("comment").value,
                    "commentTime": moment(new Date()).format("YYYY-MM-DD")
                });
                alert("Comment Added");
                setComment(false);
            }}>Post A Comment</Button>
        </div>)
    }

    const modalOffer = () => {
        return (<div id="modalOffer">
            <p>Please enter your offer</p>
            <h3>$</h3>
            <input id="offered" placeholder="00.00"></input>
            <br/>
            <br/>
            <Button size="small" variant="contained" style={{ backgroundColor: "black", color: "white" }} onClick={() => {
                postUserOffers(logins.data.token, {
                    "buyerID": logins.data.data[0].accID,
                    "productID": history.location.state.product.productID,
                    "priceOffered": document.getElementById("offered").value,
                    "timeOffered": moment(new Date()).format("YYYY-MM-DD")
                });
                alert("Offer Added");
                setOffer(false);
            }}>Post Offer</Button>
        </div>)
    }
    if (productDetails.data) {
        return (
            <>
                <Header modal={() => { }} showButton={false} showUser={logins} userInformations={logins?.data} />
                <br />
                <span id="backToListing" style={{ fontSize: 15, marginLeft: 30 }} onClick={() => history.push("/")}>Back To Listing Page</span>
                <br />
                <div id="details">
                  <Grid container>
                      <Grid item xs={6}>
                          <img src={productDetails.data[0].image} alt="Product" width="70%" height="100%" />
                      </Grid>
                      <Grid item xs={6}>
                          <div id="right">
                              <Grid container>
                                  <Grid item xs={6}>
                                      <h3>${productDetails.data[0].unitPrice}</h3>
                                  </Grid>
                                  <Grid item xs={6}>
                                      <Grid id="sellerInfo" container>
                                      <Grid item xs={2}>
                                          <div id="logo"></div>
                                      </Grid>
                                          <Grid item xs={4}>
                                              <p><b>Seller Information:</b></p>
                                              <p>{productDetails.data[0].sellerID}</p>
                                              <p>95% Positive Review</p>
                                          </Grid>

                                      </Grid>
                                  </Grid>
                                  <Grid item xs={6}>
                                      <Grid id="productInfo" container>
                                          <Grid item xs={11}>
                                              <h5>{productDetails.data[0].ProductName}</h5>
                                          </Grid>
                                      </Grid>
                                  </Grid>
                                  <Grid item xs={12}>
                                  <b>Category:</b> <p>{productDetails.data[0].categoryID}</p>
                                  </Grid>
                                  <Modal modal={
                                      modalComment
                                  }
                                      openModal={openComment}
                                      closeModal={handleClose}
                                  />
                                  <Modal modal={
                                      modalOffer
                                  }
                                      openModal={openOffer}
                                      closeModal={handleClose}
                                  />
                                  <Grid>
                                  <b>Product Details:</b>
                                  <p>{productDetails.data[0].productDescription}</p>
                                  </Grid>
                                  <Grid item xs={12}>
                                      <Grid container>
                                          <Grid item xs={2}>
                                            <Button size="small" variant="contained" style={{ backgroundColor: "black", color: "white" }} onClick={handleComment}>Post A Comment</Button>
                                          </Grid>
                                          <Grid item xs={2}>
                                               <Button size="small" variant="contained" style={{ backgroundColor: "black", color: "white" }} onClick={handleOffer}>Make An Offer</Button>
                                          </Grid>
                                          <Grid onClick={postBookmark} item xs={1}>
                                            <Bookmarks />
                                          </Grid>
                                      </Grid>
                                  </Grid>
                              </Grid>
                          </div>
                        </Grid>
                    </Grid>
                </div>
                <div id="comments">
                    <h3 id="heading">Comments:</h3>
                    {
                        Array.isArray(productComments.data) ? productComments.data.map((comment, index) => {
                        Array.isArray(productDetails.data) && productDetails.data.filter((product) => { if (product.productID === comment.productID) { comment.productID = product } return false });
                            return <Comment key={index} comment={comment} />
                        }) : <h3 id="heading">No Comments Found</h3>
                    }
                </div>
            </>
        )
    }
    else return <h1>Redirecting</h1>
}

const mapStateToProps = state => ({
    logins: state.logins,
    productDetails: state.productDetails,
    productComments: state.productComments
})

export default connect(mapStateToProps, { getProductDetails, postUserComments, postUserBookmarks, getProductComments, postUserOffers })(ProductDetails)
