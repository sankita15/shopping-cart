import React from 'react'
import { Table, Media, Label } from 'reactstrap';
import { FaPlusSquare, FaMinusSquare } from 'react-icons/fa';
import PropTypes from 'prop-types';

export default class Cart extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            cartEmpty: true,
            cart:{
                id: '',
                products:{},
                productQuantities:{},
                orderDate: null,
                totalPrice: 0
            }
        }
    }

    componentDidMount() {
        const { cookies } = this.props;

        fetch(`/api/carts/user/${cookies}`, {
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            }
        }).then( res => res.ok ? res.json() : Promise.reject(res.status))
            .then( cart => { this.setState({cart, cartEmpty: false}) })
            .catch(status => console.warn(status))
    }

    render(){

        const { cart, cartEmpty } = this.state;

        if(!cartEmpty){
        return (
            <div>
                <Label>
                    Your Shopping cart
                </Label>
                {console.log(cart)}
                <Table>
                    <tbody>
                    <tr>
                        <td>
                            <Media src="http://openclipart.org/image/300px/svg_to_png/73/rejon_Hammer.png"/>
                        </td>
                        <td>
                            <Label>
                                Hammer
                            </Label>
                            <br/>
                            <Label>
                                Rs. {cart.totalPrice}
                            </Label>
                        </td>
                        <td>
                            <FaPlusSquare />
                            <Label>
                                3
                            </Label>
                            <FaMinusSquare/>
                        </td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        )}else{
            return(
            <Label>
                Your Cart is empty.Please add item to your cart
            </Label>
            )
        }
    }
}

Cart.propTypes = {
    cookies: PropTypes.string
};

