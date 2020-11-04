import React from "react";
import Grid from '@material-ui/core/Grid';
import ListingInsights from "./ListingInsights";
import StockImage from "../components/Stock.jpg";

const ProfileDetails = ({ userInformations }) => {
    return (
        <div id="profileDetails">
                <Grid container>
                <Grid item xs={12} sm={2}>
                    <img src={StockImage} alt="Product" height="150px"/>
                </Grid>
                <Grid item xs={12} sm={3}>
                <div id="information">
                  <h1>{userInformations?.data[0]?.NAME}</h1>
                      <strong>@{userInformations?.data[0]?.NAME}</strong><br/>
                      <strong>99% Positive Reviews (99/100)</strong>
                </div>
                </Grid>
                <Grid item xs={12}>
                    <div id="privateInformation">
                        <h3>Account Information: (Private)</h3>
                        <div>
                            <strong>Name: {userInformations?.data[0]?.NAME}</strong>
                            <br />
                            <br />
                            <strong>Gender: {userInformations?.data[0]?.gender}</strong>
                            <br />
                            <br />
                            <strong>Birthday: {userInformations?.data[0]?.bdate}</strong>
                            <br />
                            <br />
                            <strong>Address: {userInformations?.data[0]?.addr}</strong>
                        </div>
                    </div>
                </Grid>
            </Grid>
            <Grid>
                <ListingInsights/>
            </Grid>
        </div>
    )
}

export default ProfileDetails;
