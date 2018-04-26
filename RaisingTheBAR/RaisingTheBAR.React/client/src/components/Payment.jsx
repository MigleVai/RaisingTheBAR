import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import ErrorMessage from './ErrorMessage';
import isValidLuhn from './functions/IsValidLuhn.js';

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
            response: ''
        };
        this.handleCvvChange = this.handleCvvChange.bind(this);
        this.handleExpMonthChange = this.handleExpMonthChange.bind(this);
        this.handleExpYearChange = this.handleExpYearChange.bind(this);
        this.handleHolderChange = this.handleHolderChange.bind(this);
        this.handleNumberChange = this.handleNumberChange.bind(this);
    }

    componentDidMount() {
        if (localStorage.getItem('cvv')) {
            this.setState({ cvv: localStorage.getItem('cvv') });
        }
        if (localStorage.getItem('exp_month')) {
            this.setState({ exp_month: localStorage.getItem('exp_month') });
        }
        if (localStorage.getItem('exp_year')) {
            this.setState({ exp_year: localStorage.getItem('exp_year') });
        }
        if (localStorage.getItem('holder')) {
            this.setState({ holder: localStorage.getItem('holder') });
        }
        if (localStorage.getItem('amount')) {
            this.setState({ amount: localStorage.getItem('amount') });
        }
        if (localStorage.getItem('number')) {
            this.setState({ number: localStorage.getItem('number') });
        }
        if (localStorage.getItem('response')) {
            this.setState({ response: localStorage.getItem('response') });
        }
    }


    handleCvvChange(event) {
        localStorage.setItem('cvv', event.target.value);
        this.setState({ cvv: event.target.value });
        var re = RegExp('\\b[0-9]{3}\\b');
        if (!re.test(event.target.value)) {
            localStorage.setItem('cvvError', 'Not a valid cvv!');
        } else {
            localStorage.setItem('cvvError', '');
        }
        if (event.target.value === '') {
            localStorage.setItem('cvvError', '');
        }
    }

    handleExpMonthChange(event, index, value) {
        this.setState({ exp_month: value });
    }

    handleExpYearChange(event, index, value) {
        this.setState({ exp_year: value });
    }

    handleHolderChange(event) {
        localStorage.setItem('holder', event.target.value);
        this.setState({ holder: event.target.value });
        if (event.target.value.length <= 2 && event.target.value.length >= 32) {
            localStorage.setItem('holderError', 'Not a valid holder!');
        } else {
            localStorage.setItem('holderError', '');
        }
        if (event.target.value === '') {
            localStorage.setItem('holderError', '');
        }
    }

    handleNumberChange(event) {
        localStorage.setItem('number', event.target.value);
        this.setState({ number: event.target.value });
        var re = RegExp('\\b[0-9]{16}\\b');
        if (!re.test(event.target.value) || !isValidLuhn(event.target.value)) {
            localStorage.setItem('numberError', 'Not a valid card number!');
        } else {
            this.setState({ numberError: '' });
            localStorage.setItem('numberError', '');
        }
        if (event.target.value === '') {
            this.setState({ numberError: '' });
            localStorage.setItem('numberError', '');
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
            },
            labelStyle: {
                fontWeight: 'normal',
                textTransform: 'none'
            },
            customWidth: {
                width: 200,
            },
            imgStyle: {
                margin: 'auto',
                paddingTop: '6%',
                width: '40%'

            },
            buttonStyle: {
                backgroundColor: '#929292'
            }


        };
        return (
            //  <Jumbotron>
            <div style={styles.displayStyles}>
                <ErrorMessage responseError={this.state.responseError} />
                <div>
                    <h3 style={styles.textStyle}>Check out</h3>
                </div>
                <form className="form-horizontal">
                    <TextField
                        value={this.state.holder}
                        onChange={(event) => this.handleHolderChange(event)}
                        floatingLabelText="Credit Card Holder"
                        floatingLabelFixed={true}
                        style={styles.textFieldSytle}
                        errorText={localStorage.getItem('holderError')} />
                    <br />
                    <TextField
                        value={this.state.number}
                        onChange={(event) => this.handleNumberChange(event)}
                        floatingLabelText="Credit Card Number"
                        floatingLabelFixed={true}
                        style={styles.textFieldSytle}
                        errorText={localStorage.getItem('numberError')} />
                    <br />
                    <TextField
                        value={this.state.cvv}
                        onChange={(event) => this.handleCvvChange(event)}
                        floatingLabelText="Cvv"
                        floatingLabelFixed={true}
                        style={styles.textFieldSytle}
                        errorText={localStorage.getItem('cvvError')} />
                    <br />

                    <DropDownMenu style={styles.customWidth} value={this.state.exp_year} onChange={this
                        .handleExpYearChange}>
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

                    <DropDownMenu style={styles.customWidth} value={this.state.exp_month} onChange={this
                        .handleExpMonthChange}>
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

                    <div><span>{localStorage.getItem('response')}</span></div>
                    <div><img style={styles.imgStyle} src="resources/cvv.jpg" alt="Cvv" /></div>
                </form>
            </div>
        );
    }
}