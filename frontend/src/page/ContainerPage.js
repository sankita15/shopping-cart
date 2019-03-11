import React from 'react';
import PropTypes from 'prop-types';

export default class ContainerPage extends React.Component {
    componentDidMount() {
        console.log(JSON.stringify(this.state), '------------*********--------------------');

        const { user } = this.props;

        fetch(`/api/carts/user/${user}`, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => (res.ok ? res.json() : Promise.reject(res.status)))
            .then(allCarts => allCarts.filter(pendingCart => pendingCart.status === 'pending')[0])
            .then(cartDetails => ((cartDetails === undefined) ? Promise.reject(404) : this.setState({ cartDetails })))
            .catch(status => console.warn(status));
    }

    getCartProducts() {
        const { cartDetails: { products, productQuantities } } = this.state;

        return Object.keys(products)
            .map(productId => this.getProduct(products[productId], productQuantities[productId]));
    }

    isCartEmpty = cartDetails => Object.keys(cartDetails).length !== 0 && Object.keys(cartDetails.products).length !== 0;

    getTotalPrice() {
        const { cartDetails: { totalPrice } } = this.state;
        return totalPrice;
    }

    render() {

    }
}

ContainerPage.propTypes = {
    user: PropTypes.string.isRequired,
};
