/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import { Table, Media, Label } from 'reactstrap';
import { FaPlusSquare, FaMinusSquare } from 'react-icons/fa';
import PropTypes from 'prop-types';

export default class Cart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cartDetails: {},
        };
    }

    componentDidMount() {
        const { user } = this.props;

        fetch(`/api/carts/user/${user}`, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => (res.ok ? res.json() : Promise.reject(res.status)))
            .then(allCart => allCart.filter(cart => cart.status === 'pending')[0])
            // TODO: USE DATA MARSHALLING METHOD BEFORE setState
            .then(cartDetails => (cartDetails === undefined ? Promise.reject(404) : this.setState({ cartDetails })))
            .catch(status => console.warn(status));
    }

    getProductLink = productId => `/products/${productId}`;

    getRows() {
        const { cartDetails: { products, productQuantities } } = this.state;

        return Object.keys(products)
            .map(productId => this.createRow(products[productId], productQuantities[productId]));
    }

    createRow({ id, imageUrl, productName, price }, productQuantity) {
        return (
            <tr key={id}>
                <td>
                    <a target="_blank" href={this.getProductLink(id)}>
                        <Media className="cart-image" src={imageUrl} />
                    </a>
                </td>
                <td>
                    <a target="_blank" className="cart-product-name" href={this.getProductLink(id)}>
                        {productName}
                    </a>
                </td>
                <td>
                    <Label>
                    Rs.
                        {' '}
                        {price}
                    </Label>
                </td>
                <td>
                    <FaMinusSquare className="cart-minus" onClick={() => this.updateProductInCart(id, 'DELETE')} />
                    <Label className="cart-quantity-label">
                        {productQuantity}
                    </Label>
                    <FaPlusSquare className="cart-plus" onClick={() => this.updateProductInCart(id, 'POST')} />
                </td>
            </tr>
        );
    }

    render() {
        if (!this.isCartEmpty()) {
            return <Label>Your Cart is empty.Please add item to your cart</Label>;
        }

        return (
            <div>
                <Label>Your Shopping cart</Label>
                <Table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>{this.getRows()}</tbody>
                </Table>
                <div className="table-row">
                    <Label className="table-final-row">
                        {`SubTotal: ${this.getTotalPrice()}`}
                    </Label>
                </div>
            </div>
        );
    }

    isCartEmpty() {
        const { cartDetails } = this.state;
        return Object.keys(cartDetails).length !== 0 && Object.keys(cartDetails.products).length !== 0;
    }

    updateProductInCart(productId, methodName) {
        const { cartDetails: {id: cartId} } = this.state;

        fetch(`/api/carts/${cartId}/product/${productId}`, {
            credentials: 'include',
            method: methodName,
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => (res.ok ? res.json() : Promise.reject(res.status)))
            .then(cartDetails => this.setState({ cartDetails }))
            .catch(status => console.warn(status));
    }

    getTotalPrice() {
        const { cartDetails: { totalPrice } } = this.state;
        return totalPrice;
    }
}

Cart.propTypes = {
    user: PropTypes.string.isRequired,
};
