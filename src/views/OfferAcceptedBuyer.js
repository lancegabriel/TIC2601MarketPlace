import React, { useEffect } from "react";
import { connect, useDispatch } from 'react-redux';
import Header from "../components/Header";
import AcceptedOfferBuyer from "../components/AcceptedOfferBuyer";
import { getAcceptedOffersBuyer } from "../actions/userOffers";
import { getAllProducts } from "../actions/products";

const OfferAcceptedBuyers = ({ logins, acceptedOfferBuyer, allProducts }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAcceptedOffersBuyer(logins?.data.token, logins?.data.data[0]?.accID))
    }, [logins, dispatch])

    useEffect(() => {
        dispatch(getAllProducts(logins?.data.token, logins?.data.data[0]?.accID))
    }, [logins, dispatch, getAllProducts])

    return (
        <>
            <Header modal={() => { }} showButton={false} showUser={true} userInformations={logins?.data} />
            <div id="offers">
                <h3 id="heading">This are orders that have been accepted by each seller.</h3>
                {
                    Array.isArray(allProducts.data) ? allProducts.data.map((product, index) => {
                        let productwithOffers = {
                            ...product,
                            offers: []
                        };
                        Array.isArray(acceptedOfferBuyer.data) && acceptedOfferBuyer.data.filter((offer) => {
                           if (product.productID === offer.productID) {
                             productwithOffers.offers.push(offer);
                            }
                            return false
                          });
                        if (productwithOffers.offers.length > 0) {
                            return <AcceptedOfferBuyer key={index} login={logins} product={productwithOffers} />
                        }
                    }) : <h3 id="heading">No Offers Found</h3>
                }
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    logins: state.logins,
    acceptedOfferBuyer: state.acceptedOfferBuyer,
    allProducts: state.allProducts
})

export default connect(mapStateToProps, { getAcceptedOffersBuyer, getAllProducts })(OfferAcceptedBuyers)
