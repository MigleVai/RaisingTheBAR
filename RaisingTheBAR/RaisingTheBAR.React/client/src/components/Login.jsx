import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
//import Jumbotron from 'bootstrap/scss/Jumbotron';
import { MuiThemeProvider } from 'material-ui/styles';

export default class Login extends React.Component {
    render() {
        const styles = {
            textStyle: {
                'text-align': 'left',
            },
            displayStyles: {
                width: '30%',
                display: 'block',
                margin: 'auto',
                padding: '5%'
            }
        };
        return (

            //  <Jumbotron>
            <div style={styles.displayStyles}>
                <div>
                    <h3 style={styles.textStyle}>Signup</h3>
                    <h6 style={styles.textStyle}>to Raise the BAR</h6>
                </div>
                <form>
                    <MuiThemeProvider>
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
                        <RaisedButton label="Submit" primary={true} />
                    </MuiThemeProvider>
                </form>
            </div>
            //  </Jumbotron>
        );
    }
}