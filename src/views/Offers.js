import React, { useEffect } from "react";
import { connect, useDispatch } from 'react-redux';
import Header from "../components/Header";
import Offer from "../components/UserOffer";
import { getUserOffers } from "../actions/userOffers";

const Offers = ({ logins, userOffers, userProducts }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserOffers(logins?.data.token, logins?.data.data[0]?.accID))}, [logins, dispatch])
    return (
        <>

            <Header modal={() => { }} showButton={false} showUser={true} userInformations={logins?.data} />
            <div id="offers">
                <h3 id="heading">This are your offers:</h3>
                {
                    Array.isArray(userOffers.data) ? userOffers.data.map((offer, index) => {
                        let productwithOffers = {
                            offers: []
                        };
                        Array.isArray(userProducts.data) && userProducts.data.filter((product) => { if (product.productID === offer.productID) { productwithOffers.offers.push(offer); productwithOffers = { ...product, offers: productwithOffers.offers } } return false });
                        return <Offer key={index} product={productwithOffers} />
                    }) : <h3 id="heading">No Offers Found</h3>
                }
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    logins: state.logins,
    userOffers: state.userOffers,
    userProducts: state.userProducts
})

export default connect(mapStateToProps, { getUserOffers })(Offers)
