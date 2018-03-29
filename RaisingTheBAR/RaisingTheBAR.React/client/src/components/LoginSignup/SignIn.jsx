import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';
//import Jumbotron from 'bootstrap/scss/Jumbotron';
import { MuiThemeProvider } from 'material-ui/styles';

export default class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logged: false
        };
    }

    // reikes cia patikrint ar geri prisijungimo duomenys
    handleLoggingChange(props) {
        this.props.onLogging(!this.props.logged);
    }

    render() {
        const styles = {
            textStyle: {
                'text-align': 'center',
            },
            displayStyles: {
                display: 'block',
                margin: 'auto',
                padding: '3%'
            },
            buttonStyle: {
                'font-weight': 'normal'
            },
        };
        return (

            //  <Jumbotron>
            <div style={styles.displayStyles}>
                <div>
                    <h3 style={styles.textStyle}>Sign In</h3>
                    <h6 style={styles.textStyle}>to Raise the BAR</h6>
                </div>
                <form>
                    <MuiThemeProvider>
                        <TextField
                            floatingLabelText="Email"
                            floatingLabelFixed={true}
                            style={styles.textFieldSytle}
                        />
                        <br />
                        <TextField
                            floatingLabelText="Password"
                            floatingLabelFixed={true}
                            style={styles.textFieldSytle}
                        />
                        <br />
                        <RaisedButton onClick={this.handleLoggingChange.bind(this)} label="Submit" primary={true} />
                        <div style={styles.registerStyle}>
                            <Link to={"/register/"}>
                                <FlatButton labelStyle={styles.buttonStyle} label="Don't have an account?" />
                            </Link>
                        </div>
                    </MuiThemeProvider>
                </form>
            </div>
            //  </Jumbotron>
        );
    }
}