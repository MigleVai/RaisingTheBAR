import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            role: 'user',
            repeatError: '',
            emailError: '',
            passwordError: ''
        };
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        // this.handleSecondPasswordChange = this.handleSecondPasswordChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.passwordRepeatValidation = this.passwordRepeatValidation.bind(this);
    }
    passwordRepeatValidation(event) {
        if (this.state.password !== event.target.value) {
            this.setState({ repeatError: 'Passwords do not match!' });
        }
        if (event.target.value === "") {
            this.setState({ repeatError: '' });
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
    handleLoggingChange(props) {
        if (this.state.email !== '' && this.state.password !== ''
            && this.state.emailError === '' && this.state.passwordError === ''
            && this.state.repeatError === '') {
            axios.post(`/api/User/RegisterUser`,
                {
                    Email: this.state.email,
                    Password: this.state.password,
                    Role: this.state.role,
                })
                .then(res => {
                    const result = res.data;
                    localStorage.setItem('jwtToken', result.token);
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + result.token;
                    this.props.handleLogging(true);
                    this.props.history.push('/');
                })
                .catch(function (error) {
                    // show error
                });
        } else {
            var error = 'This field is required!';
            this.setState({ emailError: error, passwordError: error, repeatError: error });
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
            buttonStyle: {
                backgroundColor: '#929292'
            }
        };
        return (
            //  <Jumbotron>
            <div style={styles.displayStyles}>
                <div>
                    <h3 style={styles.textStyle}>Register</h3>
                    <h6 style={styles.textStyle}>to Raise the BAR</h6>
                </div>
                <form>
                    <TextField
                        value={this.state.email}
                        onChange={this.handleEmailChange}
                        floatingLabelText="Email"
                        floatingLabelFixed={true}
                        style={styles.textFieldSytle}
                        errorText={this.state.emailError}
                    />
                    <br />
                    <TextField
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                        floatingLabelText="Password"
                        type="password"
                        floatingLabelFixed={true}
                        style={styles.textFieldSytle}
                        errorText={this.state.passwordError}
                    />
                    <br />
                    <TextField
                        floatingLabelText="Repeat Password"
                        floatingLabelFixed={true}
                        type="password"
                        style={styles.textFieldSytle}
                        errorText={this.state.repeatError}
                        onChange={this.passwordRepeatValidation}
                    />
                    <br />
                    <RaisedButton onClick={this.handleLoggingChange.bind(this)} buttonStyle={styles.buttonStyle} label="Submit" primary={true} />
                </form>
                {/* </Jumbotron> */}
            </div>
        );
    }
}