import React, { useEffect } from "react";
import { connect, useDispatch } from 'react-redux';
import Header from "../components/Header";
import Filter from "../components/Filter";
import CardComponent from "../components/Card";
import Grid from "@material-ui/core/Grid";
import { getOfferRange } from "../actions/admin";

const Admin = ({ logins, numOfProdSold }) => {
  const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getOfferRange())
  }, [logins, dispatch])
return (
    <>
        <Header modal={() => { }} showButton={false} showUser={true} userInformations={logins?.data} />
    </>
      )
  }
const mapStateToProps = state => ({
    numOfProdSold: state.numOfProdSold,
    logins: state.logins
})

export default connect(mapStateToProps, { getOfferRange })(Admin)
