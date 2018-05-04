import React from 'react';
import Breadcrumb from './Breadcrumb';
import OrderHistoryList from './OrderHistoryList';

export default class OrderHistory extends React.Component {

    render() {
        return (
            <div>
                <Breadcrumb pathname={this.props.location.pathname} />
                <hr />
                <OrderHistoryList />
            </div>
        );
    }
}