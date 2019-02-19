import React from 'react'
import { shallow } from 'enzyme'
import ItemDescription from './ItemDescription';
import { Media, Label, Button } from 'reactstrap';


describe('Item Description Page',  () => {

    const defaultProps = {
        id: '5c6a7bac06057ee4fc0d3646'
    };

    const item = {
        id: '5c6a7bac06057ee4fc0d3646',
        productName: "Leaf Rake",
        productCode: "GDN-0011",
        description: "Leaf rake with 48-inch wooden handle.",
        price: 1995,
        starRating: 3.2,
        imageUrl: "http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png",
        stock: 400
    };

    const createWrapper = () =>  shallow(<ItemDescription {...defaultProps}/>);

    it('should render Item Description Page',  () => {
        const component = createWrapper();
        const image = component.find(Media);
        const label = component.find(Label);
        const button = component.find(Button);

        expect(image.length).toBe(1);
        expect(label.length).toBe(5);
        expect(button.length).toBe(2);
    });

    it('should match snapshot',  () => {
        const component = createWrapper();

        expect(component).toMatchSnapshot();
    });

    it('should call fetch to render item description',  async() => {
        fetch.mockResolvedValueOnce({json: () => Promise.resolve(item), ok: true});
        const component = createWrapper();

        expect(component.find(Media).prop('src')).toBe('');

        expect(fetch).toHaveBeenCalledWith(`/api/products/${defaultProps.id}`, {
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            }
        });

        // eslint-disable-next-line no-undef
        await flushPromises();

        expect(component.find(Media).prop('src')).toBe(item.imageUrl);
    });
});
