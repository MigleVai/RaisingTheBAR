import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import ErrorMessage from '../ErrorMessage';

export default class PersonalInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oldpassword: '',
            newpassword: '',
            repeatpassword: '',
            responseError: ''
        };
        this.handleLoggingChange = this.handleLoggingChange.bind(this);
        this.handleOLDPasswordChange = this.handleOLDPasswordChange.bind(this);
        this.handleNEWPasswordChange = this.handleNEWPasswordChange.bind(this);
        this.handleREPEATPasswordChange = this.handleREPEATPasswordChange.bind(this);
    }

    handleLoggingChange(props) {
        axios.post(`/api/User/ChangePassword`,   {
            OldPassword: this.state.oldpassword,
            NewPassword: this.state.newpassword
        })
            .then(res => {
            })
            .catch(error => {
                this.setState({responseError: error.response.data});
            });
    }

    handleOLDPasswordChange(event) {
        this.setState({ oldpassword: event.target.value });
    }

    handleNEWPasswordChange(event) {
        this.setState({ newpassword: event.target.value });
    }

    handleREPEATPasswordChange(event) {
        this.setState({ repeatpassword: event.target.value });
    }
    render() {
        return (
            <div>
                <ErrorMessage responseError={this.state.responseError} />
                <form>
                <TextField
                        value={this.state.oldpassword}
                        onChange={this.handleOLDPasswordChange}
                        floatingLabelText="Old Password"
                        type = "password"
                        floatingLabelFixed={true}
                    />
                    <TextField
                        value={this.state.newpassword}
                        onChange={this.handleNEWPasswordChange}
                        floatingLabelText="New Password"
                        type = "password"
                        floatingLabelFixed={true}
                    />
                   <TextField
                        value={this.state.repeatpassword}
                        onChange={this.handleREPEATPasswordChange}
                        floatingLabelText="Repeat New Password"
                        type = "password"
                        floatingLabelFixed={true}
                    />
                    <RaisedButton label="Default" onClick={this.handleLoggingChange}/>
                </form>
            </div>
        );
    }
}