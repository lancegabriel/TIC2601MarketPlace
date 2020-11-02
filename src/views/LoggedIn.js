import React, { useState, useEffect } from "react";
import { connect, useDispatch } from 'react-redux';
import Header from "../components/Header";
import ProfileDetails from "../components/ProfileDetails";
import YourListings from "../components/YourListings";
import { getUserProducts } from '../actions/userProducts';

const LoggedIn = ({ logins, userProducts }) => {
    const [getProduct, setProducts] = useState(userProducts.data);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserProducts(logins?.data.token, logins?.data.data[0]?.accID));
    }, [])

    const onUserProduct = (previousProducts, value) => {
        let filteredProducts = []
        getProduct.forEach((product) => {
            if (product.categoryID === value.toString()) {
                filteredProducts.push(product)
            }
        })
        userProducts.data = filteredProducts;
        setProducts(previousProducts)
    }
    return (
        <>
            <Header modal={() => { }} showButton={false} showUser={true} userInformations={logins?.data} />
            <ProfileDetails userInformations={logins?.data} />
            <YourListings products={userProducts} onUserProduct={onUserProduct} />
        </>
    )

}

const mapStateToProps = state => ({
    logins: state.logins,
    userProducts: state.userProducts
})

export default connect(mapStateToProps, { getUserProducts })(LoggedIn)