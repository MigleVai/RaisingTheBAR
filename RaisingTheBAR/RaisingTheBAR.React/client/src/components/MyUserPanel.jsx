import React from 'react'
import FlatButton from 'material-ui/FlatButton/FlatButton';

export default class MyUserPanel extends React.Component {
    render() {
        return (
            <div>
                <FlatButton label="Sign Up"/>
                <FlatButton label="Log in"/>
            </div>
        );
    }
}