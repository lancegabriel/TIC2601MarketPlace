import React, { useEffect } from "react";
import Header from "../components/Header";
import Grid from "@material-ui/core/Grid";
import { getProducts } from '../actions/products';
import { connect, useDispatch } from 'react-redux';
import Filter from "../components/Filter";
import CardComponent from "../components/Card";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router";

const MainLoggedIn = ({ logins, products}) => {
    const dispatch = useDispatch();
    const [getProduct, setProducts] = React.useState(products.data);
    const history = useHistory();


    const handleStateChanged = (previousProducts, value) => {
        let filteredProducts = []
        getProduct.forEach((product) => {
            if (product.categoryID === value.toString()) {
                filteredProducts.push(product)
            }
        })
        products.data = filteredProducts;
        setProducts(previousProducts);
    }

    useEffect(() => {
        dispatch(getProducts)
    }, [getProducts, dispatch])
    return (
        <>
        <Header modal={() => {
        }} showButton={false} showUser={true} userInformations={logins?.data} />
            <br />
            <div id="content">
                {Array.isArray(products.data) && <Filter handleStateChanged={handleStateChanged} />}
                <Grid container style={{ marginTop: 20 }}>
                    {Array.isArray(products.data) && products.data.map((product, index) => (
                        <Grid item xs={2} key={index} style={{ paddingBottom: 50 }} >
                            <CardComponent product={product} dontShowDetails={false} />
                        </Grid>))}
                </Grid>
            </div>
        </>)
}
const mapStateToProps = state => ({
    products: state.products,
    logins: state.logins,
})


export default connect(mapStateToProps, { getProducts })(MainLoggedIn)
