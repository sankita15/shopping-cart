import React from 'react';
import { Nav, NavLink, NavItem, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { FaViadeo, FaUser } from 'react-icons/fa';

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);

        this.state = {
            dropdown: false,
        };
    }

    toggle() {
        const { dropdown } = this.state;
        this.setState({
            dropdown: !dropdown,
        });
    }

    render() {
        const { dropdown } = this.state;
        return (
            <div className="header">
                <Nav>
                    <NavItem>
                        <NavLink className="icon">
                            <FaViadeo size={45} />
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/products" className="link">
                            Home
                        </NavLink>
                    </NavItem>
                    <Dropdown nav isOpen={dropdown} toggle={this.toggle}>
                        <DropdownToggle nav className="profile">
                            <FaUser size={20} />
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem href="/profile">
                                Profile
                            </DropdownItem>
                            <DropdownItem href="/logout">
                                Log Out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </Nav>
            </div>
        );
    }
}
