import React from "react";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Modal from "./Modal";
import { useDispatch, connect } from "react-redux";
import { signout } from "../actions/signout";
import { useHistory } from "react-router";
import Model from "../components/stickman.png";

const Header = ({ modal, showButton, showUser, userInformations, signout, showSearch }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const history = useHistory();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleLogout = () => {
        dispatch(signout)
        history.push("/")
    }
    const handleToProfile = () => {
        history.push("/loggedIn")
    }

    const handleCreate = () => {
        history.push("/createlisting")
    }
    return (
        <div id="header">
            <Grid container>
                <Grid item xs={10}>
                    <div id="title" onClick = {() => history.push("/")}>
                        <strong>THINKCAN</strong>
                        <span> MARKETPLACE</span>
                    </div>
                </Grid>
                 <Grid item xs={2}>
                <Modal modal={
                    modal
                }
                    openModal={open}
                    closeModal={handleClose}
                />
                {
                    showButton && (
                        <Grid item>
                            <div id="menu">
                                <Button size="small" variant="outlined" style={{ borderRadius: 10 }}>Search</Button>
                                <Button onClick={handleOpen} size="small" variant="contained" style={{ backgroundColor: "black", color: "white" }}>Login</Button>
                            </div>
                        </Grid>)
                }
                {
                    showSearch && (
                        <div id="menu">
                            <Button size="small" variant="outlined" style={{ borderRadius: 10 }}>Search</Button>
                        </div>
                    )
                }
                {
                    showUser && (
                        <div id="user" style={{float: 'right'}}>
                          <div id="background" onClick={handleToProfile}>
                                <span></span>
                              </div>
                            <span>
                                {userInformations?.data[0]?.username}
                            </span>
                            &nbsp;&nbsp;&nbsp;<Button size="small" variant="contained" color="secondary" onClick={handleCreate}>List</Button>
                          &nbsp;&nbsp;&nbsp;<Button size="small" variant="outlined" onClick={handleLogout}>Logout</Button>
                        </div>
                    )
                }
                </Grid>
            </Grid>
        </div>
    )
}

const mapStateToProps = state => ({
    logins: state.logins
})



export default connect(mapStateToProps, { signout })(Header)
