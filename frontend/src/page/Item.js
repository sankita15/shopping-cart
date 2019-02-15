import React from 'react';
import {Card, CardImg, CardBody, CardTitle, CardText, CardSubtitle} from "reactstrap";
import PropTypes from 'prop-types';

export default class Item extends React.Component {

    constructor(props){
        super(props);
    }

    showProductDetail(){
        return "http://openclipart.org/image/300px/svg_to_png/73/rejon_Hammer.png";
    }

    render() {
        const {item} = this.props;
        return (
            <a href={this.showProductDetail()}>
            <div className="item-page">
                    <Card className="item-card">
                        <CardImg top width="100%" className="item-image" src={item.imageUrl}/>
                        <CardBody className="item-body">
                            <CardTitle>{item.productName}</CardTitle>
                            <CardSubtitle>Rs.{item.price}</CardSubtitle>
                            <CardText>{item.description}</CardText>
                        </CardBody>
                    </Card>
            </div>
            </a>
        )
    }
}

Item.propTypes = {
    item: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        productName: PropTypes.string,
        productCode: PropTypes.string,
        releaseDate: PropTypes.number,
        lastModified: PropTypes.number,
        description: PropTypes.string,
        starRating: PropTypes.number,
        price: PropTypes.number,
        imageUrl: PropTypes.string,
        stock: PropTypes.number
    }))
};
