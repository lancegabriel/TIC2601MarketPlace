import React from "react";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Modal from "./Modal";
import { useDispatch, connect } from "react-redux";
import { signout } from "../actions/signout";
import { useHistory } from "react-router";

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

    return (
        <div id="header">
            <Grid container>
                <Grid item xs={10}>
                    <div id="title" onClick = {() => history.push("/")}>
                        <strong>THINKCAN</strong>
                        <span> MARKETPLACE</span>
                    </div>
                </Grid>
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
                        <div id="user">
                            <span>
                                {userInformations?.data[0]?.username}
                            </span>
                            <div id="background" onClick={handleLogout}>
                                <span></span>
                            </div>
                        </div>
                    )
                }
            </Grid>
        </div>
    )
}

const mapStateToProps = state => ({
    logins: state.signouts
})



export default connect(mapStateToProps, { signout })(Header)