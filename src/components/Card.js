import React from "react";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import ProductImage from "./product.png";
import Bookmarks from "../components/Bookmarks";
import { useHistory } from "react-router";
import ProductDetails from "../views/ProductDetails";

const useStyles = makeStyles({
    root: {
        maxWidth: 210,
    },
    media: {
        height: 200,
    },
});

function CardComponent({ product, bookmark, dontShowDetails }) {
    const history = useHistory();
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={product.image ? product.image : ProductImage}
                    title="Product"
                />
                <CardContent style={{height: "70px"}}>
                    <span style={{ fontSize: 15 }}>
                        {product?.ProductName}
                        <span style={{ float: "right" }}>${product?.unitPrice}</span>
                    </span>
                    <br />
                    <br />
                    <div style={{fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitBoxOrient: 'vertical', WebkitLineClamp: 3, maxWidth: '100%' }}>
                        {product?.productDescription}
                    </div>
                </CardContent>
            </CardActionArea>
            <CardActions>
                {
                    !dontShowDetails && <span style={{ fontSize: 10, marginLeft: 10 }} onClick={() => {
                        history.push("/details", {product})
                    }}>
                        View More >
                    </span>
                }
                {bookmark && <span style={{ marginLeft: '50%' }}>
                    <Bookmarks />
                </span>}
            </CardActions>
        </Card>
    )
}

export default CardComponent;
