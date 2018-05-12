import React from 'react';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import isValidLuhn from '../functions/IsValidLuhn.js';

export default class Payment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.handleCvvChange = this.handleCvvChange.bind(this);
        this.handleExpMonthChange = this.handleExpMonthChange.bind(this);
        this.handleExpYearChange = this.handleExpYearChange.bind(this);
        this.handleHolderChange = this.handleHolderChange.bind(this);
        this.handleNumberChange = this.handleNumberChange.bind(this);
    }

    
    handleCvvChange(event) {
        this.props.handleCvv(event.target.value);
        var re = RegExp('\\b[0-9]{3}\\b');
        if (!re.test(event.target.value)) {
            this.props.handleCvvError('Not a valid cvv!');
        } else {
            this.props.handleCvvError('');
        }
        if (event.target.value === '') {
            this.props.handleCvvError('');
        }
    }

    handleExpMonthChange(event, index, value) {
        this.props.handleExpMonth(event, index, value);
    }

    handleExpYearChange(event, index, value) {
        this.props.handleExpYear(event, index, value);
    }

    handleHolderChange(event) {
        this.props.handleHolder(event.target.value);
        if (event.target.value.length <= 2 && event.target.value.length >= 32) {
            this.props.handleHolderError('Not a valid holder!');
        } else {
            this.props.handleHolderError('');
        }
        if (event.target.value === '') {
            this.props.handleHolderError('');
        }
    }

    handleNumberChange(event) {
        this.props.handleNumber(event.target.value);
        var re = RegExp('\\b[0-9]{16}\\b');
        if (!re.test(event.target.value) || !isValidLuhn(event.target.value)) {
            this.props.handleNumberError('Not a valid card number!');
        } else {
            this.props.handleNumberError('');
        }
        if (event.target.value === '') {
            this.props.handleNumberError('Not a valid card number!');
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
            <div style={styles.displayStyles}>
                <div>
                    <h3 style={styles.textStyle}>Check out</h3>
                </div>
                <form className="form-horizontal">
                    <TextField
                        value={this.props.holder}
                        onChange={(event) => this.handleHolderChange(event)}
                        floatingLabelText="Credit Card Holder"
                        floatingLabelFixed={true}
                        style={styles.textFieldSytle}
                        errorText={this.props.holderError} />
                    <br />
                    <TextField
                        value={this.props.number}
                        onChange={(event) => this.handleNumberChange(event)}
                        floatingLabelText="Credit Card Number"
                        floatingLabelFixed={true}
                        style={styles.textFieldSytle}
                        errorText={this.props.numberError} />
                    <br />
                    <TextField
                        value={this.props.cvv}
                        onChange={(event) => this.handleCvvChange(event)}
                        floatingLabelText="Cvv"
                        floatingLabelFixed={true}
                        style={styles.textFieldSytle}
                        errorText={this.props.cvvError} />
                    <br />

                    <DropDownMenu style={styles.customWidth} value={this.props.expYear} onChange={this
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

                    <DropDownMenu style={styles.customWidth} value={this.props.expMonth} onChange={this
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
                        Total amount: {localStorage.getItem('totalCost')}
                    </section>

                    <div><span>{this.props.response}</span></div>
                    <div><img style={styles.imgStyle} src="../resources/cvv.jpg" alt="Cvv" /></div>
                </form>
            </div>
        );
    }
}