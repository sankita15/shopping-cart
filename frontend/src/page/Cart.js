/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import { Table, Media, Label } from 'reactstrap';
import { FaPlusSquare, FaMinusSquare } from 'react-icons/fa';
import PropTypes from 'prop-types';

export default class Cart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cart: {},
        };
    }

    componentDidMount() {
        const { cookies } = this.props;

        fetch(`/api/carts/user/${cookies}`, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => (res.ok ? res.json() : Promise.reject(res.status)))
            .then((carts) => {
                // TODO: USE DATA MARSHALLING METHOD BEFORE setState
                this.setState({ cart: carts[0] });
            })
            .catch(status => console.warn(status));
    }

    getProductLink = productId => `/products/${productId}`;

    getRows() {
        const { cart: { products, productQuantities } } = this.state;

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
                    <FaMinusSquare className="cart-minus" onClick={() => this.reduceProductFromCart(id)} />
                    <Label className="cart-quantity-label">
                        {productQuantity}
                    </Label>
                    <FaPlusSquare className="cart-plus" onClick={() => this.addProductToCart(id)} />
                </td>
            </tr>
        );
    }

    render() {
        if (this.isCartEmpty()) {
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
        const { cart } = this.state;
        return !cart.products || Object.keys(cart.products).length === 0;
    }

    addProductToCart(productId) {
        const { cart: { id: cartId } } = this.state;

        fetch(`/api/carts/${cartId}/product/${productId}`, {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => (res.ok ? res.json() : Promise.reject(res.status)))
            .then(cartDetails => this.setState({ cart: cartDetails }))
            .catch(status => console.warn(status));
    }

    reduceProductFromCart(productId) {
        const { cart: { id: cartId } } = this.state;

        fetch(`/api/carts/${cartId}/product/${productId}`, {
            credentials: 'include',
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => (res.ok ? res.json() : Promise.reject(res.status)))
            .then(cartDetails => this.setState({ cart: cartDetails }))
            .catch(status => console.warn(status));
    }

    getTotalPrice() {
        const { cart } = this.state;
        return cart.totalPrice;
    }
}

Cart.propTypes = {
    cookies: PropTypes.string,
};
