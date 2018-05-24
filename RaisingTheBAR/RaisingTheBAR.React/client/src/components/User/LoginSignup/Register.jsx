import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import ErrorMessage from '../ErrorMessage';
import addTempCartCheck from '../../../functions/addTempCartCheck.js';

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            role: 'user',
            repeatError: '',
            emailError: '',
            passwordError: '',
            repeat: '',
            responseError: ''
        };
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.passwordRepeatValidation = this.passwordRepeatValidation.bind(this);
    }
    passwordRepeatValidation(event) {
        this.setState({repeat: event.target.value});
        if (this.state.password !== event.target.value) {
            this.setState({ repeatError: 'Passwords do not match!' });
        }
        else{
            this.setState({ repeatError: '' });
        }
        if (event.target.value === "") {
            this.setState({ repeatError: '' });
        }
    }
    handlePasswordChange(event) {
        this.setState({ password: event.target.value, passwordError: '' });
        var re = RegExp('^((?=.*[\\d])|(?=.*[!@#$%^&*,\\.\\=\\+]))(?=.*[A-Z])(?=.*[a-z])[\\w!@#$%^&*\\.\\=\\+]{8,}$');
        if(!re.test(event.target.value)) {
            this.setState({ passwordError: 'Not a valid password!' });
        }else {
            this.setState({ passwordError: '' });
        }
        if (event.target.value === '') {
            this.setState({ passwordError: '' });
        }
       
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
        var error = 'This field is required!';
        if (this.state.email !== '' && this.state.password !== '' && this.state.repeat !== ''
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
                    localStorage.setItem('role', 'user');
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + result.token;
                    this.props.handleLogging(true);
                    //WHY THI NO WORK
                    var tempCart = addTempCartCheck(true);
                    if(Number(tempCart)){
                        this.props.handleAmount(Number(tempCart));
                    }else{
                        this.setState({ responseError: tempCart});
                    }
                    this.props.history.push('/');
                    localStorage.removeItem('productAmount');
                    localStorage.removeItem('cartNotLogged');
                })
                .catch(error => {//(function (error) {
                    this.setState({ responseError: error.response.data });
                });
        } else {
            if (this.state.emailError !== '' || this.state.email === '') {
                this.setState({ emailError: error });
            }
            if (this.state.passwordError !== '' || this.state.password === '') {
                this.setState({ passwordError: error });
            }
            if (this.state.repeatError !== '' || this.state.repeat === '') {
                this.setState({ repeatError: error });
            }
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
                <ErrorMessage responseError={this.state.responseError} />
                <div>
                    <h3 style={styles.textStyle}>Register</h3>
                    <h6 style={styles.textStyle}>to Raising the BAR</h6>
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
                        value={this.state.repeat}
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