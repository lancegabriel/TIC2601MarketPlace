import React from 'react';
import { Provider } from 'react-redux';
import * as store from './store';
import {
  Router,
  Switch,
  Route,
} from "react-router-dom";
import Main from "./views/Main";
import LoggedIn from "./views/LoggedIn";
import Comments from "./views/Comments";
import Bookmarks from "./views/Bookmarks";
import Offers from "./views/Offers";
import ProductDetails from "./views/ProductDetails";
import CreateListing from "./views/CreateListing";
import MainLoggedIn from "./views/MainLoggedIn";
import history from "./history";
import { PersistGate } from 'redux-persist/integration/react'
import AdminPricePerCat from "./views/AdminPricePerCat";
import AdminNoSoldPerSeller from "./views/AdminNoSoldPerSeller";
import AdminHighTrans from "./views/AdminHighTrans";
import OffersGiven from "./views/OffersGiven";
import OfferAcceptedBuyers from "./views/OfferAcceptedBuyer"

function App() {
  return (
    <Provider store={store.default.store}>
      <PersistGate loading={null} persistor={store.default.persistor}>
        <Router history={history}>
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>
            <Route exact path="/loggedIn">
              <LoggedIn />
            </Route>
            <Route exact path="/comments">
              <Comments />
            </Route>
            <Route exact path="/bookmarks">
              <Bookmarks />
            </Route>
            <Route exact path="/offersRecieved">
              <Offers />
            </Route>
            <Route exact path="/offersGiven">
              <OffersGiven />
            </Route>
            <Route exact path="/details">
              <ProductDetails />
            </Route>
            <Route exact path="/createlisting">
              <CreateListing />
            </Route>
            <Route exact path="/mainloggedin">
              <MainLoggedIn />
            </Route>
            <Route exact path="/adminPricePerCat">
              <AdminPricePerCat />
            </Route>
            <Route exact path="/adminNoSoldPerSeller">
              <AdminNoSoldPerSeller />
            </Route>
            <Route exact path="/adminHighTrans">
              <AdminHighTrans />
            </Route>
            <Route exact path="/offerAcceptedBuyer">
              <OfferAcceptedBuyers />
            </Route>
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
