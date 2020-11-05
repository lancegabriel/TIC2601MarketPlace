import React, { useEffect, useState } from "react";
import { connect, useDispatch } from 'react-redux';
import Header from "../components/Header";
import Filter from "../components/Filter";
import CardComponent from "../components/Card";
import { useHistory } from "react-router";
import Grid from "@material-ui/core/Grid";
import { getNoSoldPerSeller } from "../actions/admin";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const AdminNoSoldPerSeller = ({ logins, adminNoSoldPerSeller, getNoSoldPerSeller }) => {
  const history = useHistory();
  const useStyles = makeStyles({
  table: {
    maxWidth: 500,
    marginLeft:20
  },
});
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(getNoSoldPerSeller)
  }, [dispatch,getNoSoldPerSeller]);
  console.log(adminNoSoldPerSeller)
const classes = useStyles();
return (
    <>
    <Header modal={() => { }} showButton={false} showUser={true} userInformations={logins?.data} />
    <div id="listOfNoSoldPerSeller">
    <Button id="backToListing"
    variant="contained"
    style={{margin:20}}
    onClick={() => history.push("/LoggedIn")}>Back To Profile</Button><br/>
    <h1 style={{marginLeft:20}}>Sellers with highest number of products sold:</h1><br/>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Account ID</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Number of Products</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {adminNoSoldPerSeller.data.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.accID}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.countProducts}</TableCell>
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
    adminNoSoldPerSeller: state.adminNoSoldPerSeller,
    logins: state.logins
})

export default connect(mapStateToProps, { getNoSoldPerSeller })(AdminNoSoldPerSeller)
