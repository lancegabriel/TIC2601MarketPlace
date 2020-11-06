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
import { setLogin } from "../actions/logins";
import { setSignup } from "../actions/signups";
import { useHistory } from "react-router";
import { signout } from "../actions/signout";

const Main = ({ getProducts, products, setLogin, setSignup, logins, signout, signups, showUser}) => {
    const dispatch = useDispatch();
    const [value, setValue] = React.useState(0);
    const [getProduct, setProducts] = React.useState(products.data);
    const history = useHistory();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    React.useEffect(() => {
        if (logins && logins.data && logins.data.success) {
            history.push("/mainloggedin")
        }
        else if (logins && logins.data && logins.data.data && logins.data.data === "Not Login") {
            alert("Unable To Login")
            dispatch(signout)
        }
    }, [logins, dispatch, history, signout])

    function TabPanel(props) {
        const { children, value, index } = props;

        return value === index && (children)
    }

    const handleLogin = () => {
        const loginUsername = document.getElementById("loginUsername").value;
        const loginPassword = document.getElementById("loginPassword").value;
        const body = {
            username: loginUsername,
            password: loginPassword
        }
        setLogin(body);
    }

    const handleSignup = async () => {
        const signupUsername = document.getElementById("signupUsername").value;
        const signupPassword = document.getElementById("signupPassword").value;
        const signupName = document.getElementById("signupName").value;
        const signupAddress = document.getElementById("signupAddress").value;
        const signupEmail = document.getElementById("signupEmail").value;
        const signupGender = document.getElementById("signupGender").value;
        const signupbDate = document.getElementById("signupbDate").value;
        const body = {
            username: signupUsername,
            PASSWORD: signupPassword,
            NAME: signupName,
            addr: signupAddress,
            email: signupEmail,
            gender: signupGender,
            bdate: signupbDate
        }
        await setSignup(body);
        if (signups.data === "Not Signup") {
            alert("Unable To Signup");
        }
        else {
            alert("User Account Created");
            const body = {
              username: signupUsername,
              password: signupPassword
            }
            setLogin(body)
        }
    }

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

    const modalBody = () => {
        return <Paper square>
            <Tabs
                value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
                aria-label="disabled tabs example"
            >
                <Tab label="Login" />
                <Tab label="Signup" />
            </Tabs>
            <TabPanel value={value} index={0}>
                <form noValidate autoComplete="on">
                    <Input id="loginUsername" name="username" placeholder="Username" fullWidth />
                    <Input id="loginPassword" name="password" type="password" placeholder="Password" fullWidth />
                    <Button variant="outlined" onClick={handleLogin}>Login</Button>
                </form>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <form noValidate autoComplete="osn">
                    <Input id="signupName" placeholder="Name" fullWidth />
                    <Input id="signupUsername" placeholder="Username" fullWidth />
                    <Input id="signupPassword" type="password" placeholder="Password" fullWidth />
                    <Input id="signupAddress" placeholder="Address" fullWidth />
                    <Input id="signupEmail" placeholder="Email" fullWidth />
                    <Input id="signupGender" placeholder="Gender" fullWidth />
                    <Input type="date" id="signupbDate" placeholder="Birthday" fullWidth />
                  <Button variant="outlined" onClick={handleSignup}>Signup</Button>
                </form>
            </TabPanel>
        </Paper>
    }
    useEffect(() => {
        dispatch(getProducts)
    }, [getProducts, dispatch])
    if (logins.data === true) {
    return (
        <>
            <Header modal= {
                modalBody
            }
                showButton={false}
                showUser={true}
            />
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
} else {
  return (
      <>
          <Header modal= {
              modalBody
          }
              showButton={true}
              showUser={false}
          />
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
}
const mapStateToProps = state => ({
    products: state.products,
    logins: state.logins,
    signups: state.signups
})


export default connect(mapStateToProps, {getProducts, setLogin, setSignup, signout })(Main)
