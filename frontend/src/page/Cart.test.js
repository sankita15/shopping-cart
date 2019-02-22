import React from 'react';
import { shallow } from 'enzyme';
import { Table, Label } from 'reactstrap';
import Cart from './Cart';

describe('carts page', () => {
    const defaultProps = {
        cookies: 'alice',
    };

    const cart = [
        {
            id: '5c6bf8a306057eeb12dfb7c4',
            status: 'pending',
            products: {
                '59d89875479ded2a718bac13': {
                    'id': '59d89875479ded2a718bac13',
                    'productName': 'colgatewhite',
                    'productCode': 'GE-1206',
                    'releaseDate': 1483539355570,
                    'lastModified': 1507367029712,
                    'description': 'dentifrice',
                    'price': 3,
                    'starRating': 4.5,
                    'imageUrl': 'http://colgate.com/2/',
                    'stock': 1000,
                },
                '59d89875479ded2a718bac14': {
                    'id': '59d89875479ded2a718bac14',
                    'productName': 'gilettemousse',
                    'productCode': 'GE-1206',
                    'releaseDate': 1486224955570,
                    'lastModified': 1507367029713,
                    'description': 'moussearaser',
                    'price': 2,
                    'starRating': 4.2,
                    'imageUrl': 'http://gilette.com/2/',
                    'stock': 1000,
                },
            },
            productQuantities: {
                '59d89875479ded2a718bac13': 1,
                '59d89875479ded2a718bac14': 2,
            },
            lastModified: 1551162037567,
            orderDate: 1550482348428,
            totalPrice: 547,
        },
    ];

    let component;

    const createWrapper = () => shallow(<Cart {...defaultProps} />);

    beforeEach(async () => {
        fetch.mockResolvedValueOnce({ json: () => Promise.resolve(cart), ok: true });

        component = createWrapper();

        // eslint-disable-next-line no-undef
        await flushPromises();
    });

    afterEach(() => {
        jest.clearAllMocks();
        fetch.resetMocks();
    });

    it('should match snapshot', () => {
        expect(component).toMatchSnapshot();
    });

    it('should render carts page when cart is not empty', () => {
        const table = component.find(Table);

        expect(table.length).toBe(1);
    });

    it('should call fetch for /carts', () => {
        expect(fetch).toHaveBeenCalledWith(`/api/carts/user/${defaultProps.cookies}`, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    });

    it('should render cart empty info when cart is empty', async () => {
        fetch.resetMocks();

        fetch.mockResolvedValueOnce({ json: () => Promise.resolve([{}]), ok: true });

        const wrapper = createWrapper();

        // eslint-disable-next-line no-undef
        await flushPromises();

        const message = wrapper.find(Label);

        expect(message.length).toBe(1);
    });
});
