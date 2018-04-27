import React from 'react';
import TextField from 'material-ui/TextField';
import ErrorMessage from './ErrorMessage';

export default class OrderDetailsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            firstName: '',
            lastName: ''
        };
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);

    }


    componentDidMount() {
        if (localStorage.getItem('address')) {
            this.setState({ address: localStorage.getItem('address') });
        }
        if (localStorage.getItem('firstName')) {
            this.setState({ firstName: localStorage.getItem('firstName') });
        }
        if (localStorage.getItem('lastName')) {
            this.setState({ lastName: localStorage.getItem('lastName') });
        }
    }

    handleAddressChange(event) {
        
        localStorage.setItem('address', event.target.value);
        this.setState({ address: event.target.value });
        var re = RegExp('[A-Za-z]');
        if (!re.test(event.target.value)) {
            localStorage.setItem('addressError', 'Not a valid address!');
        } else {
            localStorage.setItem('addressError', '');
        }
        if (event.target.value === '') {
            localStorage.setItem('addressError', '');
        }
    }

    handleFirstNameChange(event) {
        
        localStorage.setItem('firstName', event.target.value);
        this.setState({ firstName: event.target.value });
        var re = RegExp('[A-Za-z]');
        if (!re.test(event.target.value)) {
            localStorage.setItem('firstNameError', 'Not a valid name!');
        } else {
            localStorage.setItem('firstNameError', '');
        }
        if (event.target.value === '') {
            localStorage.setItem('firstNameError', '');
        }
    }

    handleLastNameChange(event) {
        
        localStorage.setItem('lastName', event.target.value);
        this.setState({ lastName: event.target.value });
        var re = RegExp('[A-Za-z]');
        if (!re.test(event.target.value)) {
            localStorage.setItem('lastNameError', 'Not a valid last name!');
        } else {
            localStorage.setItem('lastNameError', '');
        }
        if (event.target.value === '') {
            localStorage.setItem('lastNameError', '');
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
                <div>
                    <h3 style={styles.textStyle}>Order info</h3>
                </div>
                <form >
                    <TextField
                        value={this.state.address}
                        onChange={(event) => this.handleAddressChange(event)}
                        floatingLabelText="Address"
                        floatingLabelFixed={true}
                        style={styles.textFieldSytle}
                        errorText={localStorage.getItem('addressError')} />
                    <br />
                    <TextField
                        value={this.state.firstName}
                        onChange={(event) => this.handleFirstNameChange(event)}
                        floatingLabelText="First Name"
                        floatingLabelFixed={true}
                        style={styles.textFieldSytle}
                        errorText={localStorage.getItem('firstNameError')} />
                    <br />
                    <TextField
                        value={this.state.lastName}
                        onChange={(event) => this.handleLastNameChange(event)}
                        floatingLabelText="Last Name"
                        floatingLabelFixed={true}
                        style={styles.textFieldSytle}
                        errorText={localStorage.getItem('lastNameError')} />
                </form>
            </div>
        );
    }
}