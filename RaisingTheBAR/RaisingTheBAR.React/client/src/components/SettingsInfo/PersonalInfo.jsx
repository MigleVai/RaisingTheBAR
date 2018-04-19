import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import ErrorMessage from '../ErrorMessage';

export default class PersonalInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            responseError: ''
        };
        this.handleLoggingChange = this.handleLoggingChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
    }

    componentDidMount(props) {
        axios.get(`/api/User/GetUserData`)
            .then(res => {
                const result = res.data;
                this.setState({ firstname: result.firstname, lastname: result.lastname });
            })
            .catch(error => {
                this.setState({responseError: error.response.data});
            });
    }
    handleLoggingChange(props) {
        axios.post(`/api/User/UpdateUserData`, {
            FirstName: this.state.firstname,
            LastName: this.state.lastname
        })
            .then(res => {
            })
            .catch(error => {
                this.setState({responseError: error.response.data});
            });
    }

    handleNameChange(event) {
        this.setState({ firstname: event.target.value });
    }

    handleLastNameChange(event) {
        this.setState({ lastname: event.target.value });
    }
    render() {
        return (
            <div>
                <ErrorMessage responseError={this.state.responseError} />
                <form>
                    <TextField
                        value={this.state.firstname}
                        onChange={this.handleNameChange}
                        floatingLabelText="Name"
                        floatingLabelFixed={true}
                    />
                    <TextField
                        value={this.state.lastname}
                        onChange={this.handleLastNameChange}
                        floatingLabelText="Last Name"
                        floatingLabelFixed={true}
                    />
                    <RaisedButton label="Default" onClick={this.handleLoggingChange} />
                </form>
            </div>
        );
    }
}