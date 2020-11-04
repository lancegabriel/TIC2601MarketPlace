import React, { useEffect } from "react";
import { connect } from 'react-redux';
import Header from "../components/Header";
import Filter from "../components/Filter";
import CardComponent from "../components/Card";
import Grid from "@material-ui/core/Grid";
import { getUserBookmarks } from "../actions/userBookmarks";

const Bookmarks = ({ logins, userBookmarks, userProducts, getUserBookmarks }) => {
    useEffect(() => {
        getUserBookmarks(logins?.data.token, logins?.data.data[0]?.accID)
    }, [logins,getUserBookmarks])
    return (
        <>
            <Header modal={() => { }} showButton={false} showUser={true} userInformations={logins?.data} />
            <div id="bookmarks">
                <Grid container>
                    <Grid style={{ marginTop: 15 }} item xs={11}>
                        <h3>Your Bookmarks</h3>
                    </Grid>
                    <Grid style={{ marginTop: 20 }} item xs={1}>
                    {Array.isArray(userBookmarks.data) && <Filter />}
                    </Grid>
                </Grid>
                {
                    <Grid container style={{ marginTop: 20 }}>
                        {
                            Array.isArray(userBookmarks.data) ? userBookmarks.data.map((bookmark, index) => {
                                Array.isArray(userProducts.data) && userProducts.data.filter((product) => { if (product.productID === bookmark.productID) { bookmark.productID = product } return false});
                                return (< Grid item xs={2} key={index} style={{ paddingBottom: 50 }} >
                                    <CardComponent product={bookmark.productID} bookmark={true} />
                                </Grid>)
                            }
                            ) : <h3>No Bookmarks Found</h3>
                        }
                    </Grid>
                }
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    logins: state.logins,
    userBookmarks: state.userBookmarks,
    userProducts: state.userProducts
})

export default connect(mapStateToProps, { getUserBookmarks })(Bookmarks)
