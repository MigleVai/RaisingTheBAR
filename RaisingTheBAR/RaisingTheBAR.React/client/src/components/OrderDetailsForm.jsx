import React from 'react';
import TextField from 'material-ui/TextField';
import ErrorMessage from './ErrorMessage';

export default class OrderDetailsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            firstName: '',
            lastName: '',
            firstNameError: '',
            lastNameError: '',
        };
        this.handleAdderssChange = this.handleAdderssChange.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
    }

   

    handleAdderssChange(event) {
        this.setState({ adderss: event.target.value });
        var re = RegExp('/^$|\s+/ ');
        if (!re.test(event.target.value)) {
            this.setState({ adderssError: 'Not a valid adderss!' });
        } else {
            this.setState({ adderssError: '' });
        }
        if (event.target.value === '') {
            this.setState({ adderssError: '' });
        }
    }

    handleFirstNameChange(event) {
        this.setState({ firstName: event.target.value });
        var re = RegExp('/^$|\s+/ ');
        if (!re.test(event.target.value)) {
            this.setState({ firstNameError: 'Not a valid name!' });
        } else {
            this.setState({ firstNameError: '' });
        }
        if (event.target.value === '') {
            this.setState({ firstNameError: '' });
        }
    }

    handleLastNameChange(event) {
        this.setState({ lastName: event.target.value });
        var re = RegExp('/^$|\s+/ ');
        if (!re.test(event.target.value)) {
            this.setState({ lastNameError: 'Not a valid last name!' });
        } else {
            this.setState({ lastNameError: '' });
        }
        if (event.target.value === '') {
            this.setState({ lastNameError: '' });
        }
    }

    render() {
        const styles = {
            textStyle: {
                textAlign: 'center'
            },
            displayStyles: {
                display: 'block',
                margin: 'auto',
                padding: '3%'
            }

        };
        return (
            //  <Jumbotron>
            <div style={styles.displayStyles}>
                <ErrorMessage responseError={this.state.responseError} />
                <div>
                    <h3 style={styles.textStyle}>Order info</h3>
                </div>
                <form className="form-horizontal">
                    <TextField
                        value={this.state.address}
                        onChange={(event) => this.handleAddressChange(event)}
                        floatingLabelText="Address"
                        floatingLabelFixed={true}
                        style={styles.textFieldSytle}
                        errorText={this.state.addressError} />
                    <br />
                    <TextField
                        value={this.state.firstName}
                        onChange={(event) => this.handleFirstNameChange(event)}
                        floatingLabelText="First Name"
                        floatingLabelFixed={true}
                        style={styles.textFieldSytle}
                        errorText={this.state.firstNameError} />
                    <br />
                    <TextField
                        value={this.state.lastName}
                        onChange={(event) => this.handleLastNameChange(event)}
                        floatingLabelText="Last Name"
                        floatingLabelFixed={true}
                        style={styles.textFieldSytle}
                        errorText={this.state.lastNameError} />
                </form>
            </div>
        );
    }
}