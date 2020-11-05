import React, { useEffect, useState } from "react";
import { connect, useDispatch } from 'react-redux';
import Header from "../components/Header";
import Filter from "../components/Filter";
import CardComponent from "../components/Card";
import { useHistory } from "react-router";
import Grid from "@material-ui/core/Grid";
import { getOfferRange } from "../actions/admin";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const AdminPricePerCat = ({ logins, offerRange, getOfferRange }) => {
  const history = useHistory();
  const useStyles = makeStyles({
  table: {
    maxWidth: 500,
    marginLeft:20
  },
});
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(getOfferRange)
  }, [dispatch,getOfferRange]);
  console.log(offerRange.data)
const classes = useStyles();
return (
    <>
    <Header modal={() => { }} showButton={false} showUser={true} userInformations={logins?.data} />
    <div id="listOfOfferRange">
    <Button id="backToListing"
    variant="contained"
    style={{margin:20}}
    onClick={() => history.push("/LoggedIn")}>Back To Profile</Button><br/>
    <h1 style={{marginLeft:20}}>Minimum and Maximum range of price for each Product:</h1><br/>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell align="right">Minimum Price</TableCell>
            <TableCell align="right">Maximum Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {offerRange.data.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.categoryName}
              </TableCell>
              <TableCell align="right">${row.minPriceOffered}</TableCell>
              <TableCell align="right">${row.maxPriceOffered}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
        </TableContainer>
    </div>
    </>
      )
  }

const mapStateToProps = state => ({
    offerRange: state.offerRange,
    logins: state.logins
})

export default connect(mapStateToProps, { getOfferRange })(AdminPricePerCat)
