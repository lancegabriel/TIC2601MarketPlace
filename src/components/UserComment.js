import React from "react";
import moment from "moment";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ProductImage from "./product.png";

const Comment = ({ comment }) => {
    return (
        <>
            <div id="productComments">
                <Grid container>
                    <Grid item xs={1}>
                        <div id="icon"></div>
                    </Grid>
                    <Grid item xs={1}>
                        <img src={comment?.productID?.image ? comment?.productID?.image : ProductImage} alt="Product" />
                    </Grid>
                    <Grid item xs={7} style={{ marginLeft: -50 }}>
                        <h3>{comment?.productID?.ProductName}</h3>
                        <p>{moment(comment?.commentTime).format("MMMM Do YYYY, h:mm:ss a")}</p>
                        <p>{comment?.COMMENT}</p>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default Comment
