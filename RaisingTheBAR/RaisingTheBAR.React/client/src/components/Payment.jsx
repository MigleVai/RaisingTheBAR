import React from 'react';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import FormErrors from './FormErrors.jsx'

export default class Payment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cvv: '',
            exp_month: 0,
            exp_year: 0,
            holder: '',
            amount: 100, 
            number: '',
            formErrors: { cvv: '', holder: '', number: '' },
            cvvValid: false,
            holderValid: false,
            numberValid: false,
            formValid: false
        };
        this.handleCvvChange = this.handleCvvChange.bind(this);
        this.handleExpMonthChange = this.handleExpMonthChange.bind(this);
        this.handleExpYearChange = this.handleExpYearChange.bind(this);
        this.handleHolderChange = this.handleHolderChange.bind(this);
        this.handleNumberChange = this.handleNumberChange.bind(this);
        this.handlePayClick = this.handlePayClick.bind(this);
    }

    getMoneyAmount() {
        //TODO fix the horrible name and connect this to the db(?)
        
    }

    // Need to check if the parameters are valid here.
    handlePayClick() {
        this.setState({ amount: 12});
        axios.post(`/api/Payment/ExecutePayment`,
                {
                    cvv: this.state.cvv,
                    exp_month: this.state.exp_month,
                    exp_year: this.state.exp_year,
                    holder: this.state.holder,
                    number: this.state.number
                })
            .then(res => {
                const result = res.data;
                localStorage.setItem('jwtToken', result.token);
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + result.token;
                this.props.onLogging(true);
            })
            .catch(function (error) {
                
            });
    }

    handleCvvChange(event) {
        this.setState({ cvv: event.target.value });
    }

    handleExpMonthChange(event, index, value) {
        this.setState({ exp_month: value });
    }

    handleExpYearChange(event, index, value) {
        this.setState({ exp_year: value });
    }
    handleHolderChange(event) {
        this.setState({ holder: event.target.value }); 
    }
    handleNumberChange(event) {
        this.setState({ number: event.target.value }); 
    }

    
    
    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value }, 
            () => { this.validateField(name, value) });
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let cvvValid = this.state.cvvValid;
        let holderValid = this.state.holderValid;
        let numberValid = this.state.numberValid;

        switch (fieldName) {
        case 'cvv':
            cvvValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.cvv = cvvValid ? '' : ' is invalid';
            break;
        case 'holder':
            holderValid = value.length >= 6;
            fieldValidationErrors.holder = holderValid ? '' : ' is too short';
            break;
         case 'number':
            numberValid = value.length >= 6;
            fieldValidationErrors.number = numberValid ? '' : ' is too short';
            break;
        default:
            break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            cvvValid: cvvValid,
            holderValid: holderValid,
            numberValid: numberValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: this.state.cvvValid && this.state.holderValid && this.state.numberValid});
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
            customWidth: {
                width: 200,
            }


        };
        return (
            <div>

            
            <div className="container">
                    <form className="form-horizontal" role="form">
                        
                        <TextField
                            value={this.state.holder}
                            onChange={(event) => this.handleUserInput(event)}
                            floatingLabelText="Credit Card Holder"
                            floatingLabelFixed={true}
                        />
                        <br />
                        <TextField
                            value={this.state.number}
                            onChange={(event) => this.handleUserInput(event)}
                            floatingLabelText="Credit Card Number"
                            floatingLabelFixed={true}
                        />
                        <br />
                        <TextField
                            value={this.state.cvv}
                            onChange={(event) => this.handleUserInput(event)}
                            floatingLabelText="Cvv"
                            floatingLabelFixed={true}
                        />
                        <br />

                        <DropDownMenu style={styles.customWidth} value={this.state.exp_year} onChange={this.handleExpYearChange}>
                            <MenuItem value={0} primaryText="Expiration year" />
                            <MenuItem value={2018} primaryText="2018" />
                            <MenuItem value={2019} primaryText="2019" />
                            <MenuItem value={2020} primaryText="2020" />
                            <MenuItem value={2021} primaryText="2021" />
                            <MenuItem value={2022} primaryText="2022" />
                            <MenuItem value={2023} primaryText="2023" />
                            <MenuItem value={2024} primaryText="2024" />
                            <MenuItem value={2025} primaryText="2025" />
                            <MenuItem value={2026} primaryText="2026" />
                            <MenuItem value={2027} primaryText="2027" />
                            <MenuItem value={2028} primaryText="2028" />
                            <MenuItem value={2029} primaryText="2029" />
                        </DropDownMenu>

                        <DropDownMenu style={styles.customWidth} value={this.state.exp_month} onChange={this.handleExpMonthChange}>
                            <MenuItem value={0} primaryText="Expiration month" />
                            <MenuItem value={1} primaryText="1" />
                            <MenuItem value={2} primaryText="2" />
                            <MenuItem value={3} primaryText="3" />
                            <MenuItem value={4} primaryText="4" />
                            <MenuItem value={5} primaryText="5" />
                            <MenuItem value={6} primaryText="6" />
                            <MenuItem value={7} primaryText="7" />
                            <MenuItem value={8} primaryText="8" />
                            <MenuItem value={9} primaryText="9" />
                            <MenuItem value={10} primaryText="10" />
                            <MenuItem value={11} primaryText="11" />
                            <MenuItem value={12} primaryText="12" />
                        </DropDownMenu>

                        <br />
                        <section>
                            Total amount: {this.state.amount}
                        </section>

                        <RaisedButton disabled={!this.state.formValid} onClick={this.handlePayClick} label="Pay Now" />

                        <FormErrors formErrors={this.state.formErrors} />
                </form>
                </div>
            </div>
        );
    }
}
            