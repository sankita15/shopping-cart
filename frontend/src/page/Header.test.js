import React from 'react';
import { shallow } from 'enzyme';
import { Nav, NavLink, NavItem, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { FaViadeo, FaUser } from 'react-icons/fa';
import Header from './Header';

describe('Header Description', () => {
    const createWrapper = () => shallow(<Header />);

    describe('render header', () => {
        it('should match snapshot', () => {
            const component = createWrapper();

            expect(component).toMatchSnapshot();
        });

        it('should render Navs for header', () => {
            const component = createWrapper();

            const icon = component.find(Nav).find(NavItem).at(0).find(NavLink)
                .find(FaViadeo);
            const home = component.find(Nav).find(NavItem).at(1).find(NavLink);
            const profile = component.find(Dropdown).find(DropdownToggle).find(FaUser);

            expect(icon.length).toEqual(1);
            expect(home.length).toEqual(1);
            expect(home.prop('children')).toEqual('Home');
            expect(profile.length).toEqual(1);
        });
    });

    describe('Home Tab', () => {
        it('should redirect to product page when click on Home Tab', () => {
            const component = createWrapper();
            const home = component.find(Nav).find(NavItem).at(1).find(NavLink);
            const homeTabLink = home.prop('href');

            expect(homeTabLink).toBe('/products');
        });
    });

    describe('Profile Icon', () => {
        it('should redirect to profile page when click on Profile icon and select profile', () => {
            const component = createWrapper();
            const account = component.find(Dropdown);
            const profileSelect = account.find(DropdownMenu).find(DropdownItem).at(0);
            const profileRedirection = profileSelect.prop('href');

            expect(profileRedirection).toBe('/profile');
        });

        it('should log out when click on Profile icon and select log out', () => {
            const component = createWrapper();
            const account = component.find(Dropdown);
            const profileSelect = account.find(DropdownMenu).find(DropdownItem).at(1);
            const profileRedirection = profileSelect.prop('href');

            expect(profileRedirection).toBe('/logout');
        });
    });
});
