import React from 'react';
import { Card, Label, CardText, Col, CardBody, Button } from 'reactstrap';
import PropTypes from 'prop-types';

export default class OrderPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const { user } = this.props;
        return (
            <div>
                <Label className="welcome-order">{`Hello ${user.toUpperCase()}, Review Your Order`}</Label>
                <Col sm={8}>
                    <Card className="order-card">
                        <CardBody className="place-order">
                            <CardText> Place your Order </CardText>
                        </CardBody>
                    </Card>
                </Col>
                <Col sm={3}>
                    <Card className="order-value-card">
                        <CardBody className="order-price">
                            <CardText className="order-summary"> Order Summary </CardText>
                            <CardText>
                                {' '}
                                {'Items: Rs 140'}
                                {' '}
                            </CardText>
                            <CardText> Delivery: Rs 40 </CardText>
                            <CardText> Cart Total: Rs 180 </CardText>
                            <Button className="place-order-button">Place Your Order</Button>
                        </CardBody>
                    </Card>
                </Col>
            </div>
        );
    }
}

OrderPage.propTypes = {
    user: PropTypes.string.isRequired,
};
