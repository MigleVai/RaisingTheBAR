import React from 'react';
import UserList from './UserList';

export default class Admin extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h1>Admin page!</h1>
                <UserList/>
            </div>
        )
    }
}