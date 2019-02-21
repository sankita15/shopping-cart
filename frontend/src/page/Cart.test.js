import React from 'react'
import { shallow } from 'enzyme'
import Cart from './Cart'
import { Table, Label } from 'reactstrap'

describe('carts page',  () => {

    const defaultProps = {
        cookies : 'alice'
    };

    const cart = {
        id: '5c6bf8a306057eeb12dfb7c4',
        products: {
            "59d89875479ded2a718bac13": {
                "id": "59d89875479ded2a718bac13",
                "productName": "colgatewhite",
                "productCode": "GE-1206",
                "releaseDate": 1483539355570,
                "lastModified": 1507367029712,
                "description": "dentifrice",
                "price": 3,
                "starRating": 4.5,
                "imageUrl": "http://colgate.com/2/",
                "stock": 1000
            },
            "59d89875479ded2a718bac14": {
                "id": "59d89875479ded2a718bac14",
                "productName": "gilettemousse",
                "productCode": "GE-1206",
                "releaseDate": 1486224955570,
                "lastModified": 1507367029713,
                "description": "moussearaser",
                "price": 2,
                "starRating": 4.2,
                "imageUrl": "http://gilette.com/2/",
                "stock": 1000
            }
        },
        productQuantities: {
            "59d89875479ded2a718bac13": 1,
            "59d89875479ded2a718bac14": 2
        },
        orderDate: 1550482348428,
        totalPrice: 547
    };

    const createWrapper = () => shallow(<Cart {...defaultProps}/>);

    const component = createWrapper();
    component.setState({
       cartEmpty: false
    });

    it('should match snapshot',  () => {

        expect(component).toMatchSnapshot();
    });

    it('should render carts page when cart is not empty',  () => {

        const table = component.find(Table);

        expect(table.length).toBe(1);
    });

    it('should render cart empty info when cart is empty',  () => {
        component.setState({
            cartEmpty: true
        });

        component.update();

        const message = component.find(Label);

        expect(message.length).toBe(1);
    });

    it('should call fetch for /carts',  () => {
        fetch.mockResolvedValueOnce({json : () => Promise.resolve(cart) , ok:true});

        expect(fetch).toHaveBeenCalledWith(`/api/carts/user/${defaultProps.cookies}`, {
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            }
        })


    });

});
