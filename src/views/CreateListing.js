import React, { useState, useEffect, useRef } from "react";
import { connect, useDispatch } from 'react-redux';
import { getCategories } from '../actions/categories';
import Header from "../components/Header";
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import Grid from "@material-ui/core/Grid";
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import Button from "@material-ui/core/Button";
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { setCreateProducts } from "../actions/createProducts";
import { useHistory } from "react-router";

const CreateListing = ({logins, getCategories, categories, setCreateProducts, productCreated}) => {
      const dispatch = useDispatch();
      const [file, setFile]= useState(null);
      const [value, setValue]= useState(null);
      const [catName, setCatName]= useState(null);
      const [open, setOpen] = useState(false);
      const history = useHistory();
      const anchorRef = useRef(null);
      const handleToggle = () => {
          setOpen((prevOpen) => !prevOpen);
      };

      function handleListKeyDown(event) {
        console.log(event.target.name)
          if (event.key === 'Tab') {
              event.preventDefault();
              setOpen(false);
          }
      }
      const handleClose = (event) => {
          handleStateChanged(event.target.value);
          if (anchorRef.current && anchorRef.current.contains(event.target)) {
              return;
          }
          setOpen(false);
      };

      const uploadSingleFile= (e) =>{
          let reader = new FileReader()
          reader.readAsDataURL(e.target.files[0])
          reader.onload = () => {
          console.log(reader.result)
          setFile(reader.result)
          };
          reader.onerror = function (error) {
              console.log('Error: ', error);
            }
      };

      const handleStateChanged = (value) => {
          setValue(value)
      }
      let imgPreview;
      if (file) {
       imgPreview = <img src={file} alt='' width="400px" height="400px" />;
      }

         const prevOpen = React.useRef(open);
         useEffect(() => {
             if (prevOpen.current === true && open === false) {
                 anchorRef.current.focus();
             }

             prevOpen.current = open;
             dispatch(getCategories)
         }, [open,dispatch,getCategories]);
      return (
          <>
              <Header modal={() => { }} showButton={false} showUser={true} userInformations={logins?.data} />
              <div id="AddProduct" style={{ margin: 50}}>
                  <h1 id="heading">Create a Listing</h1>
                  <Grid container spacing={4}>
                  <Grid item xs={12}>
                    {imgPreview}
                  </Grid>
                  <Grid item xs={12}>
                      <input type="file" name="file" onChange={uploadSingleFile}/>
                  </Grid>
                   <Grid item xs={12}>
                      <TextField id="prodName" label="Product Name" />
                   </Grid>
                    <Grid item xs={12}>
                    <TextField
                            id="prodDescription"
                            label="Product Description"
                            multiline
                            rows={4}
                            variant="outlined"
                          />
                   </Grid>
                   <Grid item xs={12}>
                   <Button ref={anchorRef}
                       aria-controls={open ? 'menu-list-grow' : undefined}
                       aria-haspopup="true"
                       onClick={handleToggle} size="small" variant="outlined" style={{ borderRadius: 10 }}>{catName == null ? "Select Category" : catName}</Button>
                   <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition>
                       {({ TransitionProps, placement }) => (
                           <Grow
                               {...TransitionProps}
                               style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                           >
                               <Paper>
                                   <ClickAwayListener onClickAway={handleClose}>
                                       <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                           <div>
                           {
                         categories.data.map((category, index) =>
                          <MenuItem key={index} name={category.categoryName} value={category.categoryID} onClick={handleClose}>{category.categoryName}</MenuItem>
                        )
                           }
                                           </div>
                                       </MenuList>
                                   </ClickAwayListener>
                               </Paper>
                           </Grow>
                       )}
                   </Popper>
                   </Grid>
                 <Grid item xs={12}>
                    <InputLabel htmlFor="price">Price</InputLabel>
                         <Input
                           id="productAmt"
                           startAdornment={<InputAdornment position="start">$</InputAdornment>}/>
                          </Grid>
                 <Grid item xs={12}>
                  <Button variant="contained" onClick={() => {
                      setCreateProducts(logins.data.token, {
                          "ProductName": document.getElementById("prodName").value,
                          "productDescription": document.getElementById("prodDescription").value,
                          "image": file,
                          "unitPrice": document.getElementById("productAmt").value,
                          "categoryID": value,
                          "sellerID": logins.data.data[0].accID
                        });
                        console.log()
                        alert("Product Created!");
                        history.push("/");
                    }}>List Item</Button>
                  </Grid>
                 </Grid>
              </div>
          </>
        )
      }

      const mapStateToProps = state => ({
      logins: state.logins,
      categories: state.categories,
      productCreated: state.productCreated
      })

export default connect(mapStateToProps, { getCategories, setCreateProducts})(CreateListing)
