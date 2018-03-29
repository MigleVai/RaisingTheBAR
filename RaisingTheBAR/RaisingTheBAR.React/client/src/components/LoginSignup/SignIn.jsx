import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';
//import Jumbotron from 'bootstrap/scss/Jumbotron';

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
                        floatingLabelText="Email"
                        floatingLabelFixed={true}
                    />
                    <br />
                    <TextField
                        floatingLabelText="Password"
                        floatingLabelFixed={true}
                    />
                    <br />
                    <RaisedButton buttonStyle={styles.buttonStyle} onClick={this.handleLoggingChange.bind(this)} label="Submit" primary={true} />
                    <div>
                        <Link to={"/register/"}>
                            <FlatButton style={styles.flatButStyle} labelStyle={styles.labelStyle} label="Don't have an account?" />
                        </Link>
                    </div>
                </form>
            </div>
            //  </Jumbotron>
        );
    }
}