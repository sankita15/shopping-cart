import React from 'react';
import { shallow } from 'enzyme';
import { Col, Card, Label, Button } from 'reactstrap';
import OrderPage from './OrderPage';

describe('Order Page', () => {
    const defaultProps = {
        user: 'alice',
    };

    const createWrapper = () => shallow(<OrderPage {...defaultProps} />);

    let component;

    beforeEach(() => {
        component = createWrapper();
    });

    it('should match snapshot', () => {
        expect(component).toMatchSnapshot();
    });

    it('should render Order page', () => {
        const welcomeMessage = component.find(Label);
        const productsOrdered = component.find(Col).at(0).find(Card);
        const orderDetails = component.find(Col).at(1).find(Card);
        const buyNowButton = component.find(Col).at(1).find(Card).find(Button);

        expect(welcomeMessage.length).toEqual(1);
        expect(productsOrdered.length).toEqual(1);
        expect(orderDetails.length).toEqual(1);
        expect(buyNowButton.length).toEqual(1);
    });
});
