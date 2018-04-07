import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            role: 'user',
            emailError: '',
            passwordError: ''
        };
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
    }

    // reikes cia patikrint ar geri prisijungimo duomenys
    handleLoggingChange(props) {
        if(this.state.emailError === '' && this.state.passwordError === '' 
        && this.state.email !== '' && this.state.password !== '')
        {
            axios.post(`/api/User/RequestToken`,
            {
                Email: this.state.email,
                Password : this.state.password,
                Role : this.state.role,
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
        }else{
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

            //  <Jumbotron>
            <div style={styles.displayStyles}>
                <div>
                    <h3 style={styles.textStyle}>Sign In</h3>
                    <h6 style={styles.textStyle}>to Raise the BAR</h6>
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
                        type = "password"
                        floatingLabelFixed={true}
                        errorText={this.state.passwordError}
                    />
                    <br />
                    <RaisedButton buttonStyle={styles.buttonStyle} onClick={this.handleLoggingChange.bind(this)} label="Submit" primary={true} />
                    <div>
                        <Link to={"/register"}>
                            <FlatButton style={styles.flatButStyle} labelStyle={styles.labelStyle} label="Don't have an account?" />
                        </Link>
                    </div>
                </form>
            </div>
            //  </Jumbotron>
        );
    }
}