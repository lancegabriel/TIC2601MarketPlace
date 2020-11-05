import React from "react";
import Grid from '@material-ui/core/Grid';
import { useHistory } from "react-router";

const ListingInsightsAdmin = () => {

    const history = useHistory();
    return (
        <div id="listingInsightsAdmin">
            <br />
            <br />
            <h5>ADMIN LISTING INSIGHTS:</h5>
            <Grid container spacing={3}>
                <Grid onClick={() => history.push("/admin")} item xs={5} style={{ backgroundColor: "lightgray", marginRight: 190, marginBottom: 30, padding: 50, textAlign: "center" }}>
                    <span>Number of products sold per seller</span>
                </Grid>
                <Grid onClick={() => history.push("/admin")} item xs={5} style={{ backgroundColor: "lightgray", marginBottom: 30, padding: 50, textAlign: "center" }}>
                    <span>Highest Transaction Category</span>
                </Grid>
                <Grid onClick={() => history.push("/admin")} item xs={5} style={{ backgroundColor: "lightgray", marginRight: 190, marginBottom: 30, padding: 50, textAlign: "center" }}>
                    <span>Offer range</span>
                </Grid>
            </Grid>
        </div>
    )
}

export default ListingInsightsAdmin;
