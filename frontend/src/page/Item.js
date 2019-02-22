import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, CardSubtitle } from 'reactstrap';
import * as PropTypes from 'prop-types';

export default class Item extends React.Component {
    showProductDetail() {
        const { id } = this.props;
        return `/products/${id}`;
    }

    render() {
        const { imageUrl, description, price, productName } = this.props;
        return (
            <a href={this.showProductDetail()}>
                <div className="item-page">
                    <Card className="item-card">
                        <CardImg top width="100%" className="item-image1" src={imageUrl} />
                        <CardBody className="item-body">
                            <CardTitle>{productName}</CardTitle>
                            <CardSubtitle>
                                Rs.
                                {price}
                            </CardSubtitle>
                            <CardText>{description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            </a>
        );
    }
}

Item.propTypes = {
    id: PropTypes.string.isRequired,
    productName: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
};
