/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import { Table, Media, Label } from 'reactstrap';
import { FaPlusSquare, FaMinusSquare } from 'react-icons/fa';
import PropTypes from 'prop-types';

export default class Cart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            allCarts: [],
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
            .then((carts) => {
                // TODO: USE DATA MARSHALLING METHOD BEFORE setState
                this.setState({ allCarts: carts });
            })
            .catch(status => console.warn(status));
    }

    getProductLink = productId => `/products/${productId}`;

    getRows(pendingCartIndex) {
        const { allCarts } = this.state;

        const { products } = allCarts[pendingCartIndex];

        const { productQuantities } = allCarts[pendingCartIndex];

        return Object.keys(products)
            .map(productId => this.createRow(products[productId], productQuantities[productId], pendingCartIndex));
    }

    createRow({ id, imageUrl, productName, price }, productQuantity, pendingCartIndex) {
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
                    <FaMinusSquare className="cart-minus" onClick={() => this.reduceProductFromCart(id, pendingCartIndex)} />
                    <Label className="cart-quantity-label">
                        {productQuantity}
                    </Label>
                    <FaPlusSquare className="cart-plus" onClick={() => this.addProductToCart(id, pendingCartIndex)} />
                </td>
            </tr>
        );
    }

    render() {
        const { allCarts } = this.state;

        const pendingCartIndex = allCarts.findIndex(cart => cart.status === 'pending');

        if (pendingCartIndex === -1 || this.isCartEmpty(pendingCartIndex)) {
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
                    <tbody>{this.getRows(pendingCartIndex)}</tbody>
                </Table>
                <div className="table-row">
                    <Label className="table-final-row">
                        {`SubTotal: ${this.getTotalPrice(pendingCartIndex)}`}
                    </Label>
                </div>
            </div>
        );
    }

    isCartEmpty(pendingCartIndex) {
        const { allCarts } = this.state;
        return Object.keys(allCarts[pendingCartIndex].products).length === 0;
    }

    addProductToCart(productId, pendingCartIndex) {
        const { allCarts } = this.state;

        fetch(`/api/carts/${allCarts[pendingCartIndex].id}/product/${productId}`, {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => (res.ok ? res.json() : Promise.reject(res.status)))
            .then(cartDetails => this.setState({ allCarts: [cartDetails] }))
            .catch(status => console.warn(status));
    }

    reduceProductFromCart(productId, pendingCartIndex) {
        const { allCarts } = this.state;

        fetch(`/api/carts/${allCarts[pendingCartIndex].id}/product/${productId}`, {
            credentials: 'include',
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => (res.ok ? res.json() : Promise.reject(res.status)))
            .then(cartDetails => this.setState({ allCarts: [cartDetails] }))
            .catch(status => console.warn(status));
    }

    getTotalPrice(pendingCartIndex) {
        const { allCarts } = this.state;
        return allCarts[pendingCartIndex].totalPrice;
    }
}

Cart.propTypes = {
    user: PropTypes.string,
};
