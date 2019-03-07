import React from 'react';
import { shallow } from 'enzyme';
import { Label, Card, Button, CardBody, InputGroup, Input } from 'reactstrap';
import RegistrationPage from './RegistrationPage';


describe('Registration Page', () => {
    const INVALID_EMAIL = 'xyz@abc';
    const VALID_EMAIL = 'xyz@abc.com';

    const INVALID_FIRSTNAME = 'ab'; // less than 3 & more than 10
    const VALID_FIRSTNAME = 'abcdef';

    const INVALID_LASTNAME = 'ab'; // less than 3 & more than 10
    const VALID_LASTNAME = 'abcdef';

    const INVALID_USERNAME = 'ab'; // less than 3 & more than 10
    const VALID_USERNAME = 'abcdef';

    const INVALID_PASSWORD = 'abcdefghij'; // less than 4 & more than 8
    const VALID_PASSWORD = 'toto';

    const SIGNUP_BODY = {
        email: VALID_EMAIL,
        username: VALID_USERNAME,
        password: VALID_PASSWORD,
        firstName: VALID_FIRSTNAME,
        lastName: VALID_LASTNAME,
    };

    window.location.assign = jest.fn();

    let component;
    let firstName;
    let lastName;
    let email;
    let username;
    let password;
    let confirmPassword;
    let button;
    let heading;
    let card;

    const createWrapper = () => shallow(<RegistrationPage />);

    beforeEach(() => {
        component = createWrapper();

        heading = component.find(Label);
        card = component.find(Card);
        firstName = component.find(Card).find(CardBody).find(Input).at(0);
        lastName = component.find(Card).find(CardBody).find(Input).at(1);
        email = component.find(Card).find(CardBody).find(InputGroup).find(Input);
        username = component.find(Card).find(CardBody).find(Input).at(3);
        password = component.find(Card).find(CardBody).find(Input).at(4);
        confirmPassword = component.find(Card).find(CardBody).find(Input).at(5);
        button = component.find(Button);
    });

    const testSetUpMethod = () => {
        firstName.props().onChange({ target: { value: VALID_FIRSTNAME } });
        lastName.props().onChange({ target: { value: VALID_LASTNAME } });
        username.props().onChange({ target: { value: VALID_USERNAME } });
        password.props().onChange({ target: { value: VALID_PASSWORD } });
        confirmPassword.props().onChange({ target: { value: VALID_PASSWORD } });
    };

    afterEach(() => {
        fetch.resetMocks();
    });

    it('should match snapshot', () => {
        expect(component).toMatchSnapshot();
    });

    it('should render Registration Page field', () => {
        expect(heading.length).toEqual(1);
        expect(card.length).toEqual(1);
        expect(button.length).toEqual(1);
    });

    it('should render invalid field when email address is not valid', () => {
        expect(email.prop('invalid')).toBeFalsy();

        email.props().onChange({ target: { value: INVALID_EMAIL } });

        const email1 = component.find(Card).find(CardBody).find(InputGroup).find(Input);

        expect(email1.prop('invalid')).toBeTruthy();
    });

    it('should render invalid field when username is not valid', () => {
        expect(username.prop('invalid')).toBeFalsy();

        username.props().onChange({ target: { value: INVALID_USERNAME } });

        const username1 = component.find(Card).find(CardBody).find(Input).at(3);

        expect(username1.prop('invalid')).toBeTruthy();
    });

    it('should render invalid field when password is not valid', () => {
        expect(password.prop('invalid')).toBeFalsy();

        password.props().onChange({ target: { value: INVALID_PASSWORD } });

        const password1 = component.find(Card).find(CardBody).find(Input).at(4);

        expect(password1.prop('invalid')).toBeTruthy();
    });

    it('should match password with confirm password field', () => {
        password.props().onChange({ target: { value: VALID_PASSWORD } });
        confirmPassword.props().onChange({ target: { value: INVALID_PASSWORD } });

        const confirmPassword1 = component.find(Card).find(CardBody).find(Input).at(5);

        expect(confirmPassword1.prop('invalid')).toBeTruthy();
    });

    it('should render invalid field when firstName is not valid', () => {
        expect(firstName.prop('invalid')).toBeFalsy();

        firstName.props().onChange({ target: { value: INVALID_FIRSTNAME } });

        const firstName1 = component.find(Card).find(CardBody).find(Input).at(0);

        expect(firstName1.prop('invalid')).toBeTruthy();
    });

    it('should render invalid field when lastName is not valid', () => {
        expect(lastName.prop('invalid')).toBeFalsy();

        lastName.props().onChange({ target: { value: INVALID_LASTNAME } });

        const lastName1 = component.find(Card).find(CardBody).find(Input).at(1);

        expect(lastName1.prop('invalid')).toBeTruthy();
    });

    it('should disable button if any field is invalid', () => {
        testSetUpMethod();

        email.props().onChange({ target: { value: INVALID_EMAIL } });

        expect(button.props().disabled).toBeTruthy();
    });

    it('should enable button if all the fields are valid', () => {
        expect(button.props().disabled).toBeTruthy();

        testSetUpMethod();
        email.props().onChange({ target: { value: VALID_EMAIL } });

        component.update();

        expect(component.find(Button).props().disabled).toBeFalsy();
    });

    it('should call fetch for POST call for sign up', async () => {
        fetch.mockResolvedValueOnce({ json: () => Promise.resolve(), ok: true });

        testSetUpMethod();
        email.props().onChange({ target: { value: VALID_EMAIL } });

        button.simulate('click');

        component.update();

        // eslint-disable-next-line no-undef
        await flushPromises();

        expect(fetch).toHaveBeenCalledWith('/api/users/signup', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(SIGNUP_BODY),
        });

        expect(window.location.assign).toHaveBeenCalledWith('/login');
    });
});
