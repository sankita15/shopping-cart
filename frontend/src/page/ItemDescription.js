import React from 'react';
import PropTypes from 'prop-types';
import { Media, Label, Button } from 'reactstrap';

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
                stock: 0
            }
        };
    }

    componentDidMount() {
        const { id } = this.props;

        fetch(`/api/products/${id}`, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.ok ? res.json() : Promise.reject(res.status))
            .then(item => this.setState({ item }))
            .catch((e) => (console.warn(e)));
    }

    render() {

        const { item: { productName, description, price, imageUrl, starRating, productCode } } = this.state;

        return (
            <div className="item-detail-page">
                <div className="item-image">
                    <Media src={imageUrl} alt={productName}/>
                </div>
                <div className="item-container">
                <div className="item-details">
                    <Label className="item-name">{productName}</Label>
                    <Label>Star Rating: {starRating}</Label>
                    <Label>Product Code: {productCode}</Label>
                    <Label>Description: {description}</Label>
                    <Label>Rs. {price}</Label>
                    <br/>
                    <br/>
                </div>
                <div className="button-group">
                    <Button className="cart">ADD TO CART</Button>
                    <Button className="buy">BUY NOW</Button>
                </div>
                </div>
            </div>
        );

    }
}

ItemDescription.propTypes = {
    id: PropTypes.string.isRequired
};
