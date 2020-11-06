import React from "react";
import Grid from '@material-ui/core/Grid';
import { useHistory } from "react-router";

const ListingInsights = () => {
    const history = useHistory();
    return (
        <div id="listingInsights">
            <br />
            <br />
            <h5>LISTING INSIGHTS:</h5>
            <Grid container>
                <Grid onClick={() => history.push("/comments")} item xs={5} style={{ backgroundColor: "lightgray", marginRight: 190, marginBottom: 30, padding: 50, textAlign: "center" }}>
                    <span>Comments</span>
                </Grid>
                <Grid onClick={() => history.push("/offersGiven")} item xs={5} style={{ backgroundColor: "lightgray", marginBottom: 30, padding: 50, textAlign: "center" }}>
                    <span>Offer Given</span>
                </Grid>
                <Grid onClick={() => history.push("/offersRecieved")} item xs={5} style={{ backgroundColor: "lightgray", marginRight: 190, marginBottom: 30, padding: 50, textAlign: "center" }}>
                    <span>Offer Received</span>
                </Grid>
                <Grid onClick={() => history.push("/bookmarks")} item xs={5} style={{ backgroundColor: "lightgray", marginBottom: 30, padding: 50, textAlign: "center" }}>
                    <span>BookMarks</span>
                </Grid>
                <Grid onClick={() => history.push("/offerAcceptedBuyer")} item xs={5} style={{ backgroundColor: "lightgray", marginRight: 190, marginBottom: 30, padding: 50, textAlign: "center" }}>
                    <span>Accepted Offers</span>
                </Grid>
            </Grid>
        </div>
    )
}

export default ListingInsights;
