import React from 'react';
import { shallow } from 'enzyme';
import ContainerPage from './ContainerPage';

describe('ContainerPage description', () => {
    let component;

    const defaultProps = {
        user: 'alice',
    };

    const EMPTY_CART = {
        id: '5c6bf8a306057eeb12dfb7c4',
        status: 'pending',
        username: 'alice',
        products: {},
        productQuantities: {},
        lastModified: 1551162037567,
        orderDate: 1550482348428,
        totalPrice: 547,
    };

    const createWrapper = () => shallow(<ContainerPage {...defaultProps} />);

    it('should test empty shopping cart', () => {
        component = createWrapper();
        const instance = component.instance();

        expect(instance.isCartEmpty(EMPTY_CART)).toEqual(false);
    });
});
