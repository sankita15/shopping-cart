import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './page/LoginPage';
import Products from './page/Products';
import ItemDescription from './page/ItemDescription';
import Cart from './page/Cart'
import * as PropTypes from 'prop-types';


const ItemDescriptionWrapper = ({ match: { params: { id } } }, props) => <ItemDescription id={id} {...props}/>;


const Page = (props) => (
    <Router>
        <Switch>
            <Route exact path="/login">
                <LoginPage {...props}/>
            </Route>
            <Route exact path="/products">
                <Products {...props}/>
            </Route>
            <Route exact path="/carts">
                <Cart {...props}/>
            </Route>
            <Route exact path="/products/:id" component={ItemDescriptionWrapper} />
        </Switch>
    </Router>
);

Page.propTypes = {
    cookies : PropTypes.string
};

export default Page;
