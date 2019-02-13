import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './page/LoginPage';
import Products from "./page/Products";


const Page = () => (
    <Router>
        <Switch>
            <Route exact path="/login">
                <LoginPage />
            </Route>
            <Route exact path="/products">
                <Products />
            </Route>
        </Switch>
    </Router>
);

export default Page;
