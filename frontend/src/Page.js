import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './page/LoginPage';
import Products from './page/Products';
import ItemDescription from './page/ItemDescription';

const ItemDescriptionWrapper = ({ match: { params: { id } } }) => <ItemDescription id={id}/>;


const Page = () => (
    <Router>
        <Switch>
            <Route exact path="/login">
                <LoginPage/>
            </Route>
            <Route exact path="/products">
                <Products/>
            </Route>
            <Route exact path="/products/:id" component={ItemDescriptionWrapper} />
        </Switch>
    </Router>
);

export default Page;
