import React from 'react';
import CartTable from '../CartTable';
import CartTotal from '../CartTotal';
import Breadcrumb from '../Breadcrumb';

export default class UserShoppingCart extends React.Component {
    render() {
        const styles={
            
        };
        return (
            <div>
                <Breadcrumb pathname={this.props.location.pathname} />
                <CartTable />
                <CartTotal />
                
            </div>
        );
    }
}

