import React from "react";
import Grid from '@material-ui/core/Grid';
import ListingInsights from "./ListingInsights";

const ProfileDetails = ({ userInformations }) => {
    return (
        <div id="profileDetails">
            <Grid container>
                <Grid item>
                    <div id="background">
                        <span></span>
                    </div>
                </Grid>
                <Grid item>
                    <div id="information">
                        <h3>{userInformations?.data[0]?.NAME}</h3>
                        <strong>{userInformations?.data[0]?.accID}</strong>
                        <br />
                        <strong>99% Positive Reviews (99/100)</strong>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div id="privateInformation">
                        <h3>ACCOUNT INFORMATION (PRIVATE):</h3>
                        <div>
                            <strong>Name: {userInformations?.data[0]?.NAME}</strong>
                            <br />
                            <br />
                            <strong>Password: {userInformations?.data[0]?.PASSWORD}</strong>
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
            <Grid container>
                <ListingInsights/>
            </Grid>
        </div>
    )
}

export default ProfileDetails;