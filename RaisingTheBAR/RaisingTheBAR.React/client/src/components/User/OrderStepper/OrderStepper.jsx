import React from 'react';
import {
    Step,
    Stepper,
    StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Payment from './Payment';
import OrderDetailsForm from './OrderDetailsForm';
import UserShoppingCart from './Cart/UserShoppingCart';
import axios from 'axios';

class HorizontalLinearStepper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            finished: false,
            stepIndex: 0,
            update: false,
            firstName: "",
            lastName: "",
            address: "",
            firstNameError: "",
            lastNameError: "",
            addressError: "",
            cvv: "",
            expMonth: 0,
            expYear: 0,
            holder: "",
            number: "",
            cvvError: "",
            holderError: "",
            numberError: "",
            responseError: "",
            response: ""
        }
        this.updateChild = this.updateChild.bind(this);
        this.handleCvv = this.handleCvv.bind(this);
        this.handleExpMonth = this.handleExpMonth.bind(this);
        this.handleExpYear = this.handleExpYear.bind(this);
        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.handleHolder = this.handleHolder.bind(this);
        this.handleNumber = this.handleNumber.bind(this);
        this.handleAddress = this.handleAddress.bind(this);
        this.handleCvvError = this.handleCvvError.bind(this);
        this.handleFirstNameError = this.handleFirstNameError.bind(this);
        this.handleLastNameError = this.handleLastNameError.bind(this);
        this.handleHolderError = this.handleHolderError.bind(this);
        this.handleNumberError = this.handleNumberError.bind(this);
        this.handleAddressError = this.handleAddressError.bind(this);
        this.handleResponseError = this.handleResponseError.bind(this);
        this.handleResponse = this.handleResponse.bind(this);
        //this.mobileOrderSum = this.mobileOrderSum.bind(this);
    }
    updateChild() {
        this.setState(state => ({
            update: !state.update
        }));
    }

    handleCvv(value) {
        this.setState({ cvv: value });
    }
    handleExpMonth(value) {
        this.setState({ expMonth: value });
    }
    handleExpYear(value) {
        this.setState({ expYear: value });
    }
    handleFirstName(value) {
        this.setState({ firstName: value });
    }
    handleLastName(value) {
        this.setState({ lastName: value });
    }
    handleHolder(value) {
        this.setState({ holder: value });
    }
    handleNumber(value) {
        this.setState({ number: value });
    }
    handleAddress(value) {
        this.setState({ address: value });
    }
    handleCvvError(value) {
        this.setState({ cvvError: value });
    }
    handleExpMonth(event, index, value) {
        this.setState({ expMonth: value });
    }
    handleExpYear(event, index, value) {
        this.setState({ expYear: value });
    }
    handleFirstNameError(value) {
        this.setState({ firstNameError: value });
    }
    handleLastNameError(value) {
        this.setState({ lastNameError: value });
    }
    handleHolderError(value) {
        this.setState({ holderError: value });
    }
    handleNumberError(value) {
        this.setState({ numberError: value });
    }
    handleAddressError(value) {
        this.setState({ addressError: value });
    }
    handleResponseError(value) {
        this.setState({ responseError: value });
    }
    handleResponse(value) {
        this.setState({ response: value });
    }
    
    handleOrderDetailsClick() {
        var error = 'This field is required!';
        if (this.state.firstName !== '' &&
            this.state.lastName !== '' &&
            this.state.address !== '' &&
            this.state.firstNameError === '' &&
            this.state.lastNameError === '' &&
            this.state.addressError === '') {
            return 1;
        } else {
            if (this.state.firstNameError !== '' || this.state.firstName === '') {
                this.state.firstNameError = error;
            }
            if (this.state.lastNameError !== '' || this.state.lastName === '') {
                this.state.lastNameError = error;
            }
            if (this.state.addressError !== '' || this.state.address === '') {
                this.state.addressError = error;
            }
            this.forceUpdate();
            return 0;
        }
    }



    handlePayClick() {
        var error = 'This field is required!';
        if (this.state.cvv !== '' &&
            this.state.holder !== '' &&
            this.state.number !== '' &&
            this.state.cvvError === '' &&
            this.state.holderError === '' &&
            this.state.numberError === '' &&
            this.state.expMonth !== '' &&
            this.state.expYear !== '') {

            axios.post(`/api/Order/FinishOrder`,
                {
                    FirstName: this.state.firstName,
                    LastName: this.state.lastName,
                    Address: this.state.address,
                    PaymentRequest: {
                        Cvv: this.state.cvv,
                        ExpMonth: this.state.expMonth,
                        ExpYear: this.state.expYear,
                        Holder: this.state.holder,
                        Number: this.state.number
                    }
                })
                .then(res => {
                    this.handleResponse(res.data);
                    this.props.handleAmount(0);
                })
                .catch(error => {
                    this.handleResponseError(error.response.data);
                });
            return 1;
        } else {
            if (this.state.cvvError !== '' || this.state.cvv === '') {
                this.state.cvvError = error;
            }
            if (this.state.holderError !== '' || this.state.holder === '') {
                this.state.holderError = error;
            }
            if (this.state.numberError !== '' || this.state.number === '') {
                this.state.numberError = error;
            }
            return 0;
        }
    }

    handleNext = () => {
        const { stepIndex } = this.state;

        if (stepIndex === 1) {
            if (this.handleOrderDetailsClick()) {
                this.setState({
                    stepIndex: stepIndex + 1,
                    finished: stepIndex >= 2
                });
            }

        }
        else if (stepIndex === 2) {
            if (this.handlePayClick()) {
                this.setState({
                    stepIndex: stepIndex + 1,
                    finished: stepIndex >= 2
                });
            }

        } else {
            this.setState({
                stepIndex: stepIndex + 1,
                finished: stepIndex >= 2
            });
            
        }


    };

    handlePrev = () => {
        const { stepIndex } = this.state;
        if (stepIndex > 0) {
            this.setState({ stepIndex: stepIndex - 1 });
        }
    };

    getStepContent(stepIndex, mobile) {
        switch (stepIndex) {
            case 0:
                return (<UserShoppingCart update={this.updateChild} mobile={mobile} productAmount={this.props.productAmount} handleAmount={this.props.handleAmount} islogged={this.props.islogged} />);
            case 1:
                return (<OrderDetailsForm firstName={this.state.firstName} lastName={this.state.lastName} address={this.state.address} firstNameError={this.state.firstNameError} lastNameError={this.state.lastNameError} addressError={this.state.addressError} handleFirstName={this.handleFirstName} handleLastName={this.handleLastName} handleAddress={this.handleAddress} handleFirstNameError={this.handleFirstNameError} handleLastNameError={this.handleLastNameError} handleAddressError={this.handleAddressError}/>);
            case 2:
                return (<Payment cvv={this.state.cvv} expMonth={this.state.expMonth} expYear={this.state.expYear} holder={this.state.holder} number={this.state.number}
                    cvvError={this.state.cvvError} holderError={this.state.holderError} numberError={this.state.numberError}
                    handleCvv={this.handleCvv} handleExpMonth={this.handleExpMonth} handleExpYear={this.handleExpYear} handleHolder={this.handleHolder} handleNumber={this.handleNumber}
                    handleCvvError={this.handleCvvError} handleHolderError={this.handleHolderError} handleNumberError={this.handleNumberError}/>);
            default:
                return 'You\'re a long way from home sonny jim!';
        }
    }

    render() {
        var floatStepper = 'left';
        var widthStepper = '60%';
        var paddingLeft = '10%';
        var paddingTopButton = '2.4%';
        var paddingRightButton = '10%';
        var floatButton = 'none';
        var marginResultText = '20%';
        var mobile = false;
        if (window.innerWidth <= 650) {
            floatStepper = 'none';
            widthStepper = 'none';
            paddingLeft = 'none';
            paddingTopButton = 'none';
            paddingRightButton = 'none';
            floatButton = 'left';
            marginResultText = '30%';
            mobile = true;
        }
        const { finished, stepIndex } = this.state;
        const contentStyle = { margin: '0 16px' };
        //197 eilute -> , maxWidth: 70%
        return (
            <div style={{ width: '100%', margin: 'auto' }}>
                {/* <Breadcrumb pathname={this.props.location.pathname} /> */}
                <div>
                    <Stepper activeStep={stepIndex} style={{ float: floatStepper, width: widthStepper, paddingLeft: paddingLeft }}>
                        <Step>
                            <StepLabel>Cart</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Details</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Payment</StepLabel>
                        </Step>
                    </Stepper>
                    <div style={{ paddingTop: paddingTopButton, paddingRight: paddingRightButton, float: floatButton, display: 'initial' }}>
                        {stepIndex < 3 &&
                            <div>
                                <FlatButton
                                    label="Back"
                                    disabled={stepIndex === 0}
                                    onClick={this.handlePrev}
                                />
                                <RaisedButton
                                    label={stepIndex === 2 ? 'Finish' : 'Next'}
                                    primary={true}
                                    disabled={this.props.productAmount === 0}
                                    onClick={this.handleNext}
                                />
                            </div>
                        }


                    </div>
                </div>
                <div style={contentStyle}>
                    {finished ? (
                        <div style={{ margin: marginResultText }}>
                            <p> {this.state.responseError}</p>
                            <p> {this.state.response}</p>
                            {this.forceRefresh}
                        </div>
                    ) : (
                            <div>
                                <div>{this.getStepContent(stepIndex, mobile)}</div>
                            </div>
                        )}
                </div>
            </div>
        );
    }
}

export default HorizontalLinearStepper;