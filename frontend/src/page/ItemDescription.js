import React from 'react';
import PropTypes from 'prop-types';
import { Media, Label, Button } from 'reactstrap';
import { FaCartPlus } from 'react-icons/fa';

export default class ItemDescription extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            item: {
                productName: '',
                description: '',
                imageUrl: '',
                price: 0,
                startRating: 0,
                productCode: '',
                stock: 0,
            },
            cartDetails: {
                id: '',
                status: null,
                username: props.cookies,
                products: {},
                productQuantities: {},
                lastModified: Date.now(),
                orderDate: Date.now(),
                totalPrice: 0,
            },
        };
    }

    createCart() {
        const { cartDetails } = this.state;

        return fetch('/api/carts', {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cartDetails),
        })
            .then(res => (res.ok ? res.json() : Promise.reject(res.status)))
            .then(updatedCart => this.setState({ cartDetails: updatedCart }))
            .catch(status => console.log('cart creation failed', status));
    }

    checkIfCartExist() {
        const { cookies } = this.props;

        return fetch(`/api/carts/user/${cookies}`, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => (res.ok ? res.json() : Promise.reject(res.status)))
            .then(cartDetails => this.setState({ cartDetails: cartDetails[0] }))
            .catch((status) => {
                if ([404].includes(status)) {
                    return this.createCart();
                }
            });
    }

    async addToCart() {
        await this.checkIfCartExist();

        const { cartDetails: { id: cartId } } = this.state;
        const { id: productId } = this.props;

        await fetch(`/api/carts/${cartId}/product/${productId}`, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        })
            .then(res => (res.ok ? res.json() : Promise.reject(res.status)))
            .then(cartDetails => this.setState({ cartDetails }))
            .catch(status => console.warn(status));

        window.location.assign('/carts');
    }


    componentDidMount() {
        const { id } = this.props;

        fetch(`/api/products/${id}`, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => (res.ok ? res.json() : Promise.reject(res.status)))
            .then(item => this.setState({ item }))
            .catch(e => (console.warn(e)));
    }

    render() {
        const { item: { productName, description, price, imageUrl, starRating, productCode } } = this.state;

        return (
            <div className="item-detail-page">
                <div className="cart-icon">
                    <FaCartPlus size={45} />
                </div>
                <div className="item-image">
                    <Media src={imageUrl} alt={productName} />
                </div>
                <div className="item-container">
                    <div className="item-details">
                        <Label className="item-name">{productName}</Label>
                        <Label>
                            Star Rating:
                            {starRating}
                        </Label>
                        <Label>
                            Product Code:
                            {productCode}
                        </Label>
                        <Label>
                            Description:
                            {description}
                        </Label>
                        <Label>
                            Rs.
                            {price}
                        </Label>
                        <br />
                        <br />
                    </div>
                    <div className="button-group">
                        <Button className="cart" onClick={() => this.addToCart()}>ADD TO CART</Button>
                        <Button className="buy" onClick={() => this.redirectToBuyNowPage()}>BUY NOW</Button>
                    </div>
                </div>
            </div>
        );
    }

    redirectToBuyNowPage = () => { window.location.assign('/buy'); };
}

ItemDescription.propTypes = {
    id: PropTypes.string,
    cookies: PropTypes.string,
};
