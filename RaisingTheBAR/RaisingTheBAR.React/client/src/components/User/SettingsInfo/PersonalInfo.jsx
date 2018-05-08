import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import ErrorMessage from '../ErrorMessage';
import Snackbar from 'material-ui/Snackbar';

export default class PersonalInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            responseError: '',
            open: false
        };
        this.handleLoggingChange = this.handleLoggingChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
    }
    handleClick = () => {
        this.setState({
            open: true,
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };
    componentDidMount(props) {
        axios.get(`/api/User/GetUserData`)
            .then(res => {
                const result = res.data;
                if(result.firstname !== null){
                    this.setState({ firstname: result.firstname, lastname: result.lastname });
                }
            })
            .catch(error => {
                this.setState({ responseError: error.response.data });
            });
    }
    handleLoggingChange(props) {
        this.handleClick();
        axios.post(`/api/User/UpdateUserData`, {
            FirstName: this.state.firstname,
            LastName: this.state.lastname
        })
            .then(res => {
            })
            .catch(error => {
                this.setState({ responseError: error.response.data });
            });
    }

    handleNameChange(event) {
        this.setState({ firstname: event.target.value });
    }

    handleLastNameChange(event) {
        this.setState({ lastname: event.target.value });
    }
    render() {
        const styles = {
            textStyle: {
                width: '100%',
            },
        };
        return (
            <div>
                <ErrorMessage responseError={this.state.responseError} />
                <form>
                    <h3>Personal Information</h3>
                    <TextField
                        value={this.state.firstname}
                        onChange={this.handleNameChange}
                        floatingLabelText="Name"
                        floatingLabelFixed={true}
                        style={styles.textStyle}
                    />
                    <br/>
                    <TextField
                        value={this.state.lastname}
                        onChange={this.handleLastNameChange}
                        floatingLabelText="Last Name"
                        floatingLabelFixed={true}
                        style={styles.textStyle}
                    />
                    <br/>
                    <RaisedButton label="Submit" onClick={this.handleLoggingChange} />
                    <Snackbar
                            open={this.state.open}
                            message="Personal Information changed!"
                            autoHideDuration={1000}
                            onRequestClose={this.handleRequestClose}
                        />
                </form>
            </div>
        );
    }
}