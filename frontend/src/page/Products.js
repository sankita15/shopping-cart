import React from 'react';
import Item from './Item';

export default class Products extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
        };
    }

    componentDidMount() {
        fetch('/api/products', {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => (res.ok ? res.json() : Promise.reject(res.status)))
            .then(products => this.setState({ products }))
            .catch(e => console.warn(e));
    }

    render() {
        const { products } = this.state;

        return (
            <div className="product-login">
                {products.map(itemDetails => (<Item productName={itemDetails.productName}
                                                    price={itemDetails.price}
                                                    description={itemDetails.description}
                                                    imageUrl={itemDetails.imageUrl}
                                                    id={itemDetails.id}
                                                    key={itemDetails.id} />))}
            </div>
        );
    }
}
