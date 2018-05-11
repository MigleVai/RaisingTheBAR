import React from 'react';
import TextField from 'material-ui/TextField';

export default class OrderDetailsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
    }


    handleAddressChange(event) {
        this.props.handleAddress(event.target.value);
        var re = RegExp('[A-Za-z]');
        if (!re.test(this.props.address)) {
            this.props.handleAddressError('Not a valid address!');
        } else {
            this.props.handleAddressError('');
        }
        if (this.props.address === '') {
            this.props.handleAddressError('');
        }
    }

    

    handleFirstNameChange(event) {
        this.props.handleFirstName(event.target.value);
        //this.setState({ firstName: event.target.value });
        var re = RegExp('[A-Za-z]');
        if (!re.test(this.props.firstName)) {
            this.props.handleFirstNameError('Not a valid name!');
        } else {
            this.props.handleFirstNameError('');
        }
        if (event.target.value === '') {
            this.props.handleFirstNameError('');
        }
    }

    handleLastNameChange(event) {
        this.props.handleLastName(event.target.value);
        var re = RegExp('[A-Za-z]');
        if (!re.test(event.target.value)) {
            this.props.handleLastNameError('Not a valid last name!');
        } else {
            this.props.handleLastNameError('');
        }
        if (event.target.value === '') {
            this.props.handleLastNameError('');
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
            <div style={styles.displayStyles}>
                <div>
                    <h3 style={styles.textStyle}>Order info</h3>
                </div>
                <form >
                    <TextField
                        value={this.props.address}
                        onChange={(event) => this.handleAddressChange(event)}
                        floatingLabelText="Address"
                        floatingLabelFixed={true}
                        style={styles.textFieldSytle}
                        errorText={this.props.addressError} />
                    <br />
                    <TextField
                        value={this.props.firstName}
                        onChange={(event) => this.handleFirstNameChange(event)}
                        floatingLabelText="First Name"
                        floatingLabelFixed={true}
                        style={styles.textFieldSytle}
                        errorText={this.props.firstNameError} />
                    <br />
                    <TextField
                        value={this.props.lastName}
                        onChange={(event) => this.handleLastNameChange(event)}
                        floatingLabelText="Last Name"
                        floatingLabelFixed={true}
                        style={styles.textFieldSytle}
                        errorText={this.props.lastNameError} />
                </form>
            </div>
        );
    }
}