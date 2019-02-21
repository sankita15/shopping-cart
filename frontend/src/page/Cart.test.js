import React from 'react'
import { shallow } from 'enzyme'
import Cart from './Cart'
import { Table } from 'reactstrap'

describe('carts page',  () => {

    const defaultProps = {
        username : 'alice'
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

    const getCookie = jest.fn();

    const createWrapper = () => shallow(<Cart />);

    it('should match snapshot',  () => {
        const component = createWrapper();

        expect(component).toMatchSnapshot();
    });

    it('should render carts page',  () => {
        const component = createWrapper();

        const table = component.find(Table);

        expect(table.length).toBe(1);
    });

    it('should call fetch for /carts',  () => {
        fetch.mockResolvedValueOnce({json : () => Promise.resolve(cart) , ok:true});
        getCookie.mockImplementation(value => Promise.resolve(value));
        const component = createWrapper();

        //expect(getCookie).toHaveBeenCalled();

        expect(fetch).toHaveBeenCalledWith(`/api/carts/user/${defaultProps.username}`, {
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            }
        })
    });

});
