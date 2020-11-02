import React, { useEffect, useState, useRef } from "react";
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { getCategories } from '../actions/categories';
import { connect, useDispatch } from 'react-redux';

const Filter = ({ getCategories, categories, handleStateChanged,  products }) => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {

        handleStateChanged(products.data,event.target.value);

        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };


    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    const dispatch = useDispatch();
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;

        dispatch(getCategories)
    }, [open,dispatch,getCategories]);
    return (<div id="filter">
        <Button ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle} size="small" variant="outlined" style={{ borderRadius: 10 }}>Filter</Button>
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
                                        categories.data.map((category, index) => <MenuItem key={index} value={category.categoryID} onClick={handleClose}>{category.categoryName}</MenuItem>)
                                    }
                                </div>
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Grow>
            )}
        </Popper>
        <br />
        <br />
    </div>)
}

const mapStateToProps = state => ({
    categories: state.categories,
    products: state.products,
})


export default connect(mapStateToProps, { getCategories })(Filter)