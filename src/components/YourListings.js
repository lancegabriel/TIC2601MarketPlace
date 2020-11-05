import React from "react";
import Card from "./Card";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Filter from "./Filter";

const YourListings = ({ products, onUserProduct }) => {

    const handleStateChanged = (previousProducts, value) => {
        onUserProduct(products.data, value)
    }
    return (
        <div id="yourListings">
            <Grid container>
                <Grid item xs={11}>
                    <h3>Your Listings:</h3>
                </Grid>
                <Grid item xs={1} style={{ marginLeft: -20 }}>
                    <div>
                        {Array.isArray(products.data) && <Filter handleStateChanged={handleStateChanged} />}
                    </div>
                </Grid>
            </Grid>
            <Grid container style={{ marginTop: 20 }}>
                {
                    Array.isArray(products.data) ? products.data.map((product, index) => {
                        return (<Grid item xs={2} key={index} style={{ paddingBottom: 50 }} >
                            <Card product={product} />
                        </Grid>)
                    }) : <h3>No Product Found</h3>
                }
            </Grid>
            {Array.isArray(products.data) &&
                <div id="seeMore">
                    <Button size="small" variant="contained" style={{ backgroundColor: "black", color: "white" }}>See More</Button>
                </div>
            }
        </div>
    )
}

export default YourListings;
