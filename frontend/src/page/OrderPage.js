import React from 'react';
import { Card, Label, CardText, Col, CardBody, Button, Media, Row } from 'reactstrap';
import PropTypes from 'prop-types';

export default class OrderPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: {},
        };
    }

    componentDidMount() {
        const { user } = this.props;

        fetch(`/api/carts/user/${user}`, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => (res.ok ? res.json() : Promise.reject(res.status)))
            .then((carts) => {
                this.setState({ cart: carts[0] });
            })
            .catch(status => console.warn(status));
    }

    isCartEmpty() {
        const { cart: { products } } = this.state;
        return !products || Object.keys(products).length === 0;
    }

    render() {
        const { user } = this.props;
        const { cart: { totalPrice } } = this.state;

        if (this.isCartEmpty()) {
            return <Label>Your Cart is empty.Please add item to your cart</Label>;
        }
        return (
            <div>
                <Label className="welcome-order">{`Hello ${user.toUpperCase()}, Review Your Order`}</Label>
                <Row>
                    <Col sm={8}>
                        <Card className="order-card">
                            {
                                this.getCartProducts()
                            }
                        </Card>
                    </Col>
                    <Col sm={3}>
                        <Card className="order-value-card">
                            <CardBody className="order-price">
                                <CardText className="order-summary">Order Summary</CardText>
                                <CardText>{`Items: ${totalPrice}`}</CardText>
                                <CardText> Delivery: Rs 40 </CardText>
                                <CardText>
                                    {' '}
                                    {`Cart Total: Rs ${totalPrice + 40}`}
                                    {' '}
                                </CardText>
                                <Button className="place-order-button" onClick={() => this.placeOrder()}>Place Your Order</Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }

    getProduct = ({ id, productName, productCode, price, imageUrl, starRating }, productQuantity) => (
        <CardBody className="place-order" key={id}>
            <Media src={imageUrl} className="order-image" />
            <CardText className="product-name">
                {productName}
            </CardText>
            <CardText className="product-code">
                {productCode}
            </CardText>
            <CardText className="product-price">
                {`Rs. ${price}`}
            </CardText>
            <CardText className="product-quantity">
                {`Quantity: ${productQuantity}`}
            </CardText>
            <CardText className="product-rating">
                {`Star Rating: ${starRating}`}
            </CardText>
            <CardText className="product-delivery">
                {`Estimated Delivery : ${new Date()}`}
            </CardText>
            <div className="horizontal-line" />
        </CardBody>
    );

    getCartProducts() {
        const { cart: { products, productQuantities } } = this.state;

        return Object.keys(products)
            .map(productId => this.getProduct(products[productId], productQuantities[productId]));
    }

    placeOrder() {
        const { cart } = this.state;
        fetch(`/api/carts/order/${cart.id}`, {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => (res.ok ? res.json() : Promise.reject(res.status)))
            .then((carts) => {
                this.setState({ cart: carts });
            }).catch(status => console.warn(status));
    }
}

OrderPage.propTypes = {
    user: PropTypes.string.isRequired,
};
