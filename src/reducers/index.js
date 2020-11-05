import { combineReducers } from 'redux'
import products from './products'
import categories from './categories';
import logins from "./logins";
import signups from "./signups";
import userProducts from "./userProducts";
import userComments from "./userComments";
import userBookmarks from "./userBookmarks";
import userOffers from "./userOffers";
import productDetails from "./productDetails";
import productComments from "./productComments";
import comments from "./comments";
import bookmarks from "./bookmarks";
import offers from "./offers";
import signout from "./signout";


export default combineReducers({
    products,
    categories,
    logins,
    signups,
    userProducts,
    userComments,
    userBookmarks,
    userOffers,
    productDetails,
    productComments,
    comments,
    offers,
    bookmarks,
    signout
 })