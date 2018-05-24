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
            badPass: '',
            passNotMatch: '',
            oldError: ''
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
        var error = 'This field is required!';
        if (this.state.oldpassword === this.state.newpassword) {
            this.setState({ badPass: 'New password cannot be the same as the old one!' });
        }
        if (this.state.newpassword !== '' && this.state.repeatpassword !== ''
            && this.state.badPass === '' && this.state.passNotMatch === ''
            && this.state.oldpassword !== '') {
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
            this.setState({ responseError: '' });
            this.forceUpdate();
        } else {
            if (this.state.badPass !== '' || this.state.newpassword === '') {
                this.setState({ badPass: error });
            }
            if (this.state.passNotMatch !== '' || this.state.repeatpassword === '') {
                this.setState({ passNotMatch: error });
            }
            if (this.state.oldpassword === '') {
                this.setState({ oldError: error });
            }
        }
    }

    handleOLDPasswordChange(event) {
        if (event.target.value !== '') {
            this.setState({ oldError: '' });
        }
        this.setState({ oldpassword: event.target.value });
    }

    handleNEWPasswordChange(event) {
        this.setState({ newpassword: event.target.value, passwordError: '' });
        var re = RegExp('^((?=.*[\\d])|(?=.*[!@#$%^&*,\\.\\=\\+]))(?=.*[A-Z])(?=.*[a-z])[\\w!@#$%^&*\\.\\=\\+]{8,}$');
        if (!re.test(event.target.value)) {
            this.setState({ badPass: 'Not a valid password!' });
        } else {
            this.setState({ badPass: '' });
        }
        if (event.target.value === '') {
            this.setState({ badPass: '' });
        }
        if (this.state.oldpassword === event.target.value) {
            this.setState({ badPass: 'New password cannot be the same as the old one!' });
        }
    }

    handleREPEATPasswordChange(event) {
        this.setState({ repeatpassword: event.target.value, passwordError: '' });
        if (this.state.newpassword !== event.target.value) {
            this.setState({ passNotMatch: 'Passwords do not match!' });
        } else {
            this.setState({ passNotMatch: '' });
        }
        if (event.target.value === '') {
            this.setState({ passNotMatch: '' });
        }
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
                        errorText={this.state.oldError}
                    />
                    <br />
                    <TextField
                        value={this.state.newpassword}
                        onChange={this.handleNEWPasswordChange}
                        floatingLabelText="New Password"
                        type="password"
                        floatingLabelFixed={true}
                        style={styles.textStyle}
                        errorText={this.state.badPass}
                    />
                    <br />
                    <TextField
                        value={this.state.repeatpassword}
                        onChange={this.handleREPEATPasswordChange}
                        floatingLabelText="Repeat New Password"
                        type="password"
                        floatingLabelFixed={true}
                        style={styles.textStyle}
                        errorText={this.state.passNotMatch}
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