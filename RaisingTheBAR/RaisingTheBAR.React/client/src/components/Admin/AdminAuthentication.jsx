import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import ErrorMessage from '../User/ErrorMessage';

export default class AdminAuthentication extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            role: 'administrator',
            emailError: '',
            passwordError: '',
            responseError: ''
        };
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleLoggingChange = this.handleLoggingChange.bind(this);
    }
    handleLoggingChange(props) {
        if (this.state.emailError === '' && this.state.passwordError === ''
            && this.state.email !== '' && this.state.password !== '') {
            axios.post(`/api/User/RequestToken`,
                {
                    Email: this.state.email,
                    Password: this.state.password,
                    Role: this.state.role,
                })
                .then(res => {
                    const result = res.data;
                    localStorage.setItem('jwtToken', result.token);
                    localStorage.setItem('role', 'administrator');
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + result.token;
                    this.props.handleLogging(true);
                    this.props.history.push('/admin');
                })
                .catch(error => {
                  if(error.response.request.statusText) {
                    this.setState({responseError: error.response.request.statusText});
                  }
                });
        } else {
            var error = 'This field is required!';
            this.setState({ emailError: error, passwordError: error });
        }
    }
    handlePasswordChange(event) {
        this.setState({ password: event.target.value, passwordError: '' });
    }
    handleEmailChange(event) {
        this.setState({ email: event.target.value });
        var re = RegExp('^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$');
        if (!re.test(event.target.value.toLowerCase())) {
            this.setState({ emailError: 'Not an email!' });
        } else {
            this.setState({ emailError: '' });
        }
        if (event.target.value === '') {
            this.setState({ emailError: '' });
        }
    }
    render() {
        const styles = {
            textStyle: {
                textAlign: 'center',
            },
            displayStyles: {
                display: 'block',
                margin: 'auto',
                padding: '3%'
            },
            labelStyle: {
                fontWeight: 'normal',
                textTransform: 'none'
            },
            buttonStyle: {
                backgroundColor: '#929292',
            },
            flatButStyle: {
                margin: '2%'
            }
        };
        return (
            <div style={styles.displayStyles}>
                <ErrorMessage responseError={this.state.responseError} />
                <div>
                    <h3 style={styles.textStyle}>Sign in as admin</h3>
                    <h6 style={styles.textStyle}>to Raising the BAR</h6>
                </div>
                <form>
                    <TextField
                        value={this.state.email}
                        onChange={this.handleEmailChange}
                        floatingLabelText="Email"
                        floatingLabelFixed={true}
                        errorText={this.state.emailError}
                    />
                    <br />
                    <TextField
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                        floatingLabelText="Password"
                        type="password"
                        floatingLabelFixed={true}
                        errorText={this.state.passwordError}
                    />
                    <br />
                    <RaisedButton buttonStyle={styles.buttonStyle} onClick={this.handleLoggingChange.bind(this)} label="Submit" primary={true} />
                </form>
            </div>
        );
    }
}