import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import moment from "moment";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ProductImage from "./product.png";
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { useHistory } from "react-router";

// All Accepted Offer by buyer
const AcceptedOfferBuyer = ({ login, product }) => {
    const history = useHistory();
    const [counter, setCounter] = useState(0);
    const [display, setDisplay] = useState("block");
    const handleChange = () => {
        if (counter === 0) {
            setDisplay("none");
            setCounter(1);
        }
        else {
            setDisplay("block");
            setCounter(0);
        }
    }
    const handleGoToListing = () => {
      history.push("/details", {product})
    }
    console.log(product.offers)
    return (
        <>
            <br />
            <div id="productOffers">
                <div id="productOffersToggle" onClick={handleChange}>
                    <Grid container>
                        <Grid item xs={1}>
                            {counter ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
                        </Grid>
                        <Grid item xs={10}>
                            <h3>{product?.ProductName}:</h3>
                        </Grid>
                    </Grid>
                </div>
                {
                    Array.isArray(product.offers) && product.offers.map((offer, index) => {
                        return (<div key={index} id="productOffersDetails" style={{ display: display }}>
                            <Grid container>
                                <Grid item xs={1}>
                                    <div id="icon"></div>
                                </Grid>
                                <Grid item xs={1}>
                                    <img src={product?.image ? product?.image : ProductImage} alt="Product" />
                                </Grid>
                                <Grid item xs={7} style={{ marginLeft: -50 }}>
                                    <h3>{product?.ProductName}</h3>
                                    <p>{moment(offer?.timeOffered).format("MMMM Do YYYY, h:mm:ss a")}</p>
                                    <h2>${offer?.priceOffered}</h2>
                                </Grid>
                                <Grid item xs={2} style={{ marginLeft: 175 }}>
                                    <Button size="small" variant="contained" style={{ backgroundColor: "black", color: "white" }}>Contact Seller</Button>
                                    <Button size="small" variant="contained" onClick={handleGoToListing} style={{ backgroundColor: "black", color: "white" }}>Go To Listing</Button>
                                </Grid>
                            </Grid>
                        </div>)
                    })
                }
            </div>
        </>
    )
}


export default AcceptedOfferBuyer
