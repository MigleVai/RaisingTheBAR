import React from 'react';
import axios from 'axios';
import ErrorMessage from '../ErrorMessage';

export default class YourInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            firstName: '',
            lastName: '',
            responseError: ''
        };
        this.getInfo = this.getInfo.bind(this);
        this.checkIfEmpty = this.checkIfEmpty.bind(this);
    }

    getInfo() {
        axios.get(`/api/User/GetUserData`)
            .then(res => {
                this.setState({ email: res.data.email });
                if (res.data.firstname !== null) {
                    this.setState({ firstName: res.data.firstname });
                }
                if (res.data.lastname !== null) {
                    this.setState({ lastName: res.data.lastname });
                }
            })
            .catch(error => {
                this.setState({ responseError: error.response.data });
            });
    }
    componentDidMount() {
        if (this.props.islogged === true) {
            this.getInfo();
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.email === '' ) {
            this.getInfo();
            return true;
        }
        if(this.state.email !== nextState.email){
            return true;
        }
        if(this.state.firstName !== nextState.firstName || this.state.lastName !== nextState.lastName){
            this.getInfo();
            return true;
        }
        return false;
    }
    checkIfEmpty(name) {
        if (name !== '') {
            return <span>{name}</span>;
        } else {
            return <i>not set</i>;
        }
    }
    render() {
        return (
            <div>
                <ErrorMessage responseError={this.state.responseError} />
                <form>
                    <h3 style={{marginBottom: '20px'}}>Your Information</h3>
                    <div style={{ textAlign: 'left' }}>
                        <p>Email: {this.state.email}</p>
                        <p>First Name: {this.checkIfEmpty(this.state.firstName)}</p>
                        <p>Last Name: {this.checkIfEmpty(this.state.lastName)}</p>
                    </div>
                </form>
            </div>
        );
    }
}