import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import Logged from './Logged';
import FlatButton from 'material-ui/FlatButton';
import BadgeIcon from './BadgeIcon';

export default class RightHeader extends React.Component {
    render() {
        const styles =
            {
                labelStyle: {
                    fontWeight: 'bold',
                    textTransform: 'none'
                },
                buttonStyle: {
                    marginTop: '8%',
                },
                displayStyle: {
                    display: 'inline-flex'
                },
            }
        return (
            <div style={styles.displayStyle}>
                {/* <SearchBar /> */}
                <BadgeIcon islogged={this.props.islogged} productAmount={this.props.productAmount} action={this.props.action}/>
                <div>{this.props.islogged ? <Logged handleLogging={this.props.handleLogging} /> : <Link to={"/shop/signin"}><FlatButton id="SigninButton" style={styles.buttonStyle} labelStyle={styles.labelStyle} label="Sign in" /></Link>}</div>
            </div>
        );
    }
}