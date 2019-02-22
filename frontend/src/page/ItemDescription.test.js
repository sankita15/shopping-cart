import React from 'react';
import { shallow } from 'enzyme';
import { Media, Label, Button } from 'reactstrap';
import ItemDescription from './ItemDescription';


describe('Item Description Page', () => {
    const defaultProps = {
        id: '5c6a7bac06057ee4fc0d3646',
        cookies: 'alice',
    };

    const ITEM = {
        id: defaultProps.id,
        productName: 'Leaf Rake',
        productCode: 'GDN-0011',
        description: 'Leaf rake with 48-inch wooden handle.',
        price: 1995,
        starRating: 3.2,
        imageUrl: 'http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png',
        stock: 400,
    };

    const EMPTY_CART = {
        id: '',
        status: null,
        username: 'alice',
        products: {},
        productQuantities: {},
        lastModified: 1489805155570,
        orderDate: 1489805155570,
        totalPrice: 0,
    };

    const CART = {
        ...EMPTY_CART,
        id: '5c71694e06057e0960b31579',
        status: 'pending',
    };

    const FILLED_CART = {
        ...CART,
        products: {
            '5c6fbc0206057e041f95c27c': {
                'id': '5c6fbc0206057e041f95c27c',
                'productName': 'Garden Cart',
                'productCode': 'GDN-0023',
                'releaseDate': 1489805155570,
                'lastModified': 1550826498308,
                'description': '15 gallon capacity rolling garden cart',
                'price': 3295,
                'starRating': 4.2,
                'imageUrl': 'http://openclipart.org/image/300px/svg_to_png/58471/garden_cart.png',
                'stock': 19,
            },
        },
        productQuantities: {
            '5c6fbc0206057e041f95c27c': 1,
        },
        totalPrice: 3295,
    };

    const createWrapper = () => shallow(<ItemDescription {...defaultProps} />);

    let component;

    beforeEach(() => {
        fetch.mockResolvedValueOnce({
            json: () => Promise.resolve(ITEM),
            ok: true,
        });

        component = createWrapper();
    });

    afterEach(() => {
        fetch.resetMocks();
    });

    window.location.assign = jest.fn();

    it('should render Item Description Page', () => {
        const image = component.find(Media);
        const label = component.find(Label);
        const button = component.find(Button);

        expect(image.length).toBe(1);
        expect(label.length).toBe(5);
        expect(button.length).toBe(2);
    });

    it('should match snapshot', () => {
        expect(component).toMatchSnapshot();
    });

    it('should call fetch to render item description', async () => {
        fetch.mockResolvedValueOnce({
            json: () => Promise.resolve(ITEM),
            ok: true,
        });
        const wrapper = createWrapper();

        expect(wrapper.find(Media).prop('src')).toBe('');

        expect(fetch)
            .toHaveBeenCalledWith(`/api/products/${defaultProps.id}`, {
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

        // eslint-disable-next-line no-undef
        await flushPromises();

        expect(wrapper.find(Media)
            .prop('src'))
            .toBe(ITEM.imageUrl);
    });

    it('should call fetch for getting cart data', async () => {
        fetch.mockResolvedValueOnce({ status: 404 });
        fetch.mockResolvedValueOnce({
            json: () => Promise.resolve(CART),
            ok: true,
        });
        fetch.mockResolvedValueOnce({
            json: () => Promise.resolve(FILLED_CART),
            ok: true,
        });

        // const component = createWrapper();
        const addToCart = component.find(Button)
            .at(0);

        addToCart.simulate('click');

        component.update();

        // eslint-disable-next-line no-undef
        await flushPromises();

        expect(fetch.mock.calls.length)
            .toBe(4);

        expect(fetch.mock.calls[0][0])
            .toBe(`/api/products/${defaultProps.id}`);

        expect(fetch.mock.calls[0][1])
            .toEqual({
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });


        expect(fetch.mock.calls[1][0])
            .toBe(`/api/carts/user/${defaultProps.cookies}`);

        expect(fetch.mock.calls[1][1])
            .toEqual({
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });


        expect(fetch.mock.calls[2][0])
            .toBe('/api/carts');
        expect(fetch.mock.calls[2][1])
            .toEqual({
                credentials: 'include',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: expect.any(String),
            });
        expect(JSON.parse(fetch.mock.calls[2][1].body))
            .toEqual({
                ...EMPTY_CART,
                lastModified: expect.any(Number),
                orderDate: expect.any(Number),
            });


        expect(fetch.mock.calls[3][0])
            .toBe(`/api/carts/${CART.id}/product/${ITEM.id}`);
        expect(fetch.mock.calls[3][1])
            .toEqual({
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
            });
    });
});
