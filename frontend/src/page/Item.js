import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, CardSubtitle } from 'reactstrap';
import PropTypes from 'prop-types';

export default class Item extends React.Component {
    static showProductDetail() {
        return 'http://openclipart.org/image/300px/svg_to_png/73/rejon_Hammer.png';
    }

    render() {
        const { imageUrl, description, price, productName } = this.props;
        return (
            <a href={Item.showProductDetail()}>
                <div className="item-page">
                    <Card className="item-card">
                        <CardImg top width="100%" className="item-image" src={imageUrl} />
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
    productName: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
};
