import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
//import Jumbotron from 'bootstrap/scss/Jumbotron';

export default class Register extends React.Component {
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
                    <TextField
                        floatingLabelText="Repeat Password"
                        floatingLabelFixed={true}
                        style={styles.textFieldSytle}
                    />
                    <br />
                    <RaisedButton buttonStyle={styles.buttonStyle} label="Submit" primary={true} />
                </form>
                {/* </Jumbotron> */}
            </div>
        );
    }
}