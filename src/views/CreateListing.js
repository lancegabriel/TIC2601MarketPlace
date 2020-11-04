import React, { useState, useEffect } from "react";
import { connect, useDispatch } from 'react-redux';
import Header from "../components/Header";
import Grid from "@material-ui/core/Grid";
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import Button from "@material-ui/core/Button";

const CreateListing = ({logins }) => {
      const dispatch = useDispatch();
      return (
          <>
              <Header modal={() => { }} showButton={false} showUser={true} userInformations={logins?.data} />
              <div id="AddProduct" style={{ margin: 50}}>
                  <h1 id="heading">Create a Listing</h1>
                  <Grid container spacing={4}>
                   <Grid item xs={12}>
                      <TextField id="standard-basic" label="Product Name" />
                   </Grid>
                    <Grid item xs={12}>
                    <TextField
                            id="outlined-multiline-static"
                            label="Product Description"
                            multiline
                            rows={4}
                            variant="outlined"
                          />
                   </Grid>
                 <Grid item xs={12}>
                    <InputLabel htmlFor="standard-adornment-amount">Price</InputLabel>
                         <Input
                           id="standard-adornment-amount"
                           startAdornment={<InputAdornment position="start">$</InputAdornment>}/>
                          </Grid>

                 <Grid item xs={12}>
                  <Button variant="contained">List Item</Button>
                  </Grid>
                 </Grid>
              </div>
          </>
      )
      }

      const mapStateToProps = state => ({
      logins: state.logins,
      })

export default connect(mapStateToProps, {  })(CreateListing)
