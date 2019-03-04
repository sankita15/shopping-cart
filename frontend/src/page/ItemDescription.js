import React from 'react';
import PropTypes from 'prop-types';
import { Media, Label, Button, Row } from 'reactstrap';
import { FaCartPlus } from 'react-icons/fa';

export default class ItemDescription extends React.Component {
    constructor(props) {
        super(props);

        const cartDetails = {
            id: '',
            status: null,
            username: props.user,
            products: {},
            productQuantities: {},
            lastModified: Date.now(),
            orderDate: Date.now(),
            totalPrice: 0,
        };

        this.state = {
            cartQuantity: 0,
            item: {
                productName: '',
                description: '',
                imageUrl: '',
                price: 0,
                startRating: 0,
                productCode: '',
                stock: 0,
            },
            cartDetails,
            allCarts: [cartDetails],
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
            .then(updatedCart => this.setState({ allCarts: [updatedCart] }))
            .catch(status => console.log('cart creation failed', status));
    }

    checkIfCartExist() {
        const { user } = this.props;

        return fetch(`/api/carts/user/${user}`, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => (res.ok ? res.json() : Promise.reject(res.status)))
            .then(cart => this.setState({ allCarts: cart }))
            .catch((status) => {
                if ([404].includes(status)) {
                    return this.createCart();
                }
            });
    }

    isPendingCartAvailable() {
        const { allCarts } = this.state;

        const pendingCart = allCarts.filter(cart1 => cart1.status === 'pending');

        return pendingCart.length !== 0;
    }

    async addToCart() {
        await this.checkIfCartExist();

        if (!this.isPendingCartAvailable()) {
            await this.createCart();
        }

        const { allCarts } = this.state;

        const { id: productId } = this.props;

        const pendingCartIndex = allCarts.findIndex(cart1 => cart1.status === 'pending');

        await fetch(`/api/carts/${allCarts[pendingCartIndex].id}/product/${productId}`, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        })
            .then(res => (res.ok ? res.json() : Promise.reject(res.status)))
            .then(cart => this.setState({ allCarts: [cart] }))
            .then(() => this.calculateCartQuantity(pendingCartIndex))
            .catch(status => console.warn('Failed', status));
    }


    async componentDidMount() {
        const { id } = this.props;

        await this.checkIfCartExist();

        const { allCarts } = this.state;

        const pendingCartIndex = allCarts.findIndex(cart1 => cart1.status === 'pending');

        fetch(`/api/products/${id}`, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => (res.ok ? res.json() : Promise.reject(res.status)))
            .then(item => this.setState({ item }))
            .then(() => this.calculateCartQuantity(pendingCartIndex))
            .catch(e => (console.warn(e)));
    }

    render() {
        const { item: { productName, description, price, imageUrl, starRating, productCode }, cartQuantity } = this.state;

        return (
            <div className="item-detail-page">
                <div className="cart-icon">
                    <Row>
                        <Label className="cart-quantity">{cartQuantity}</Label>
                    </Row>
                    <Row>
                        <FaCartPlus size={45} onClick={() => this.redirectToCartPage()} />
                    </Row>
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

    redirectToCartPage = () => window.location.assign('/carts');

    async redirectToBuyNowPage() {
        await this.addToCart();

        window.location.assign('/buy');
    }

    calculateCartQuantity(pendingCartIndex) {
        const { allCarts } = this.state;

        if (pendingCartIndex !== -1 && Object.keys(allCarts[pendingCartIndex].products).length !== 0) {
            const { productQuantities } = allCarts[pendingCartIndex];

            const quantity = Object.keys(productQuantities).map(productId => productQuantities[productId])
                .reduce((acc, value) => acc + value);

            this.setState({
                cartQuantity: quantity,
            });
        }
    }
}

ItemDescription.propTypes = {
    id: PropTypes.string,
    user: PropTypes.string,
};
