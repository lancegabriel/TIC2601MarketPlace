import React, { useEffect } from "react";
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

const ProductDetails = ({ logins, getProductDetails, productDetails, getProductComments, productComments }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        const productId = history.location.state.product.productID;
        getProductDetails(logins?.data.token, productId);
        getProductComments(logins?.data.token, productId);
    }, [history, getProductDetails, getProductComments])
    return (
        <>
            <Header modal={() => { }} showButton={false} showUser={logins} userInformations={logins?.data} />
            <br />
            <span style={{ fontSize: 15, marginLeft: 30 }} onClick={() => history.push("/")}>Back To Lising Page</span>
            <br />
            <div id="details">
                <Grid container>
                    <Grid item xs={6}>
                        <img src={productDetails.data[0].image ? productDetails.data[0].image : ProductImage} alt="Product" width="70%" height="100%" />
                    </Grid>
                    <Grid item xs={6}>
                        <div id="right">
                            <Grid container>
                                <Grid item xs={6}>
                                    <h3>${productDetails.data[0].unitPrice}</h3>
                                </Grid>
                                <Grid item xs={6}>
                                    <Grid id="sellerInfo" container>
                                        <Grid item xs={4}>
                                            <p>{productDetails.data[0].sellerID}</p>
                                            <p>95% Positive Review</p>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <div id="logo"></div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={6}>
                                    <Grid id="productInfo" container>
                                        <Grid item xs={11}>
                                            <h5>{productDetails.data[0].ProductName}</h5>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <Bookmarks />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <p>{productDetails.data[0].categoryID}</p>
                                </Grid>
                                <p>{productDetails.data[0].productDescription}</p>
                                <Grid item xs={12}>
                                    <Grid container>
                                        <Grid item xs={7}>
                                            <Button size="small" variant="contained" style={{ backgroundColor: "black", color: "white" }}>Post A Comment</Button>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Button size="small" variant="contained" style={{ backgroundColor: "black", color: "white" }}>Make An Offer</Button>
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

const mapStateToProps = state => ({
    logins: state.logins,
    productDetails: state.productDetails,
    productComments: state.productComments
})

export default connect(mapStateToProps, { getProductDetails, getProductComments })(ProductDetails)