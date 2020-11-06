import React, { useEffect } from "react";
import { connect, useDispatch } from 'react-redux';
import Header from "../components/Header";
import OfferGiven from "../components/UserOfferGiven";
import { getGivenOffers } from "../actions/userOffers";

const OffersGiven = ({ logins, givenOffers, products }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getGivenOffers(logins?.data.token, logins?.data.data[0]?.accID))
    }, [logins, dispatch])
    return (
        <>
            <Header modal={() => { }} showButton={false} showUser={true} userInformations={logins?.data} />
            <div id="offers">
                <h3 id="heading">This are all your given offer:</h3>
                {
                    Array.isArray(products.data) ? products.data.map((product, index) => {
                        let productwithOffers = {
                            ...product,
                            offers: []
                        };
                        Array.isArray(givenOffers.data) && givenOffers.data.filter((offer) => {
                           if (product.productID === offer.productID) {
                             productwithOffers.offers.push(offer);
                            }
                            return false
                          });
                        if (productwithOffers.offers.length > 0) {
                            return <OfferGiven key={index} login={logins} product={productwithOffers} />
                        }
                    }) : <h3 id="heading">No Offers Found</h3>
                }
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    logins: state.logins,
    givenOffers: state.givenOffers,
    products: state.products
})

export default connect(mapStateToProps, { getGivenOffers })(OffersGiven)
