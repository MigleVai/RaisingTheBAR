import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
//import Jumbotron from 'bootstrap/scss/Jumbotron';

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            role: 'user'
        };
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        // this.handleSecondPasswordChange = this.handleSecondPasswordChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
    }
    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }
    handleEmailChange(event) {
        this.setState({ email: event.target.value });
    }
    handleLoggingChange(props) {
        console.log(this.state);
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
            })
            .catch(function (error) {
                // show error
            });
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
                    />
                    <br />
                    <TextField
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                        floatingLabelText="Password"
                        type = "password"
                        floatingLabelFixed={true}
                        style={styles.textFieldSytle}
                    />
                    <br />
                    <TextField
                        floatingLabelText="Repeat Password"
                        floatingLabelFixed={true}
                        type = "password"
                        style={styles.textFieldSytle}
                    />
                    <br />
                    <RaisedButton onClick={this.handleLoggingChange.bind(this)} buttonStyle={styles.buttonStyle} label="Submit" primary={true} />
                </form>
                {/* </Jumbotron> */}
            </div>
        );
    }
}