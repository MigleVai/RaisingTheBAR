import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import ErrorMessage from '../ErrorMessage';
import Snackbar from 'material-ui/Snackbar';

export default class PersonalInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oldpassword: '',
            newpassword: '',
            repeatpassword: '',
            responseError: '',
            open: false,
        };
        this.handleLoggingChange = this.handleLoggingChange.bind(this);
        this.handleOLDPasswordChange = this.handleOLDPasswordChange.bind(this);
        this.handleNEWPasswordChange = this.handleNEWPasswordChange.bind(this);
        this.handleREPEATPasswordChange = this.handleREPEATPasswordChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
    }

    handleClick = () => {
        this.setState({
            open: true,
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };
    handleLoggingChange(props) {
        axios.post(`/api/User/ChangePassword`, {
            OldPassword: this.state.oldpassword,
            NewPassword: this.state.newpassword
        })
            .then(res => {
                this.handleClick();
            })
            .catch(error => {
                this.setState({ responseError: error.response.data });
            });
    }

    handleOLDPasswordChange(event) {
        this.setState({ oldpassword: event.target.value });
    }

    handleNEWPasswordChange(event) {
        this.setState({ newpassword: event.target.value });
    }

    handleREPEATPasswordChange(event) {
        this.setState({ repeatpassword: event.target.value });
    }
    render() {
        const styles = {
            textStyle: {
                width: '100%',
            },
        };
        return (
            <div>
                <ErrorMessage responseError={this.state.responseError} />
                <form>
                    <h3>Change Password</h3>
                    <TextField
                        value={this.state.oldpassword}
                        onChange={this.handleOLDPasswordChange}
                        floatingLabelText="Old Password"
                        type="password"
                        floatingLabelFixed={true}
                        style={styles.textStyle}
                    />
                    <br />
                    <TextField
                        value={this.state.newpassword}
                        onChange={this.handleNEWPasswordChange}
                        floatingLabelText="New Password"
                        type="password"
                        floatingLabelFixed={true}
                        style={styles.textStyle}
                    />
                    <br />
                    <TextField
                        value={this.state.repeatpassword}
                        onChange={this.handleREPEATPasswordChange}
                        floatingLabelText="Repeat New Password"
                        type="password"
                        floatingLabelFixed={true}
                        style={styles.textStyle}
                    />
                    <br />
                    <RaisedButton label="Submit" onClick={this.handleLoggingChange} />
                    <Snackbar
                            open={this.state.open}
                            message="Password changed!"
                            autoHideDuration={1000}
                            onRequestClose={this.handleRequestClose}
                        />
                </form>
            </div>
        );
    }
}