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
import Breadcrumb from './Breadcrumb';
import UserShoppingCart from './Cart/UserShoppingCart';
import axios from 'axios';

class HorizontalLinearStepper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            finished: false,
            stepIndex: 0
        }
        this.mobileOrderSum = this.mobileOrderSum.bind(this);
    }

    componentDidMount() {
        if (localStorage.getItem('cvv')) {
            localStorage.setItem('cvv', '');
        }
        if (localStorage.getItem('exp_month')) {
            localStorage.setItem('exp_month', '');
        }
        if (localStorage.getItem('exp_year')) {
            localStorage.setItem('exp_year', '');
        }
        if (localStorage.getItem('firstName')) {
            localStorage.setItem('firstName', '');
        }
        if (localStorage.getItem('lastName')) {
            localStorage.setItem('lastName', '');
        }
        if (localStorage.getItem('holder')) {
            localStorage.setItem('holder', '');
        }
        if (localStorage.getItem('number')) {
            localStorage.setItem('number', '');
        }
        if (localStorage.getItem('address')) {
            localStorage.setItem('address', '');
        }
        if (localStorage.getItem('cvvError')) {
            localStorage.setItem('cvvError', '');
        }
        if (localStorage.getItem('firstNameError')) {
            localStorage.setItem('firstNameError', '');
        }
        if (localStorage.getItem('lastNameError')) {
            localStorage.setItem('lastNameError', '');
        }
        if (localStorage.getItem('holderError')) {
            localStorage.setItem('holderError', '');
        }
        if (localStorage.getItem('numberError')) {
            localStorage.setItem('numberError', '');
        }
        if (localStorage.getItem('addressError')) {
            localStorage.setItem('addressError', '');
        }
    }
    handleOrderDetailsClick() {
        var error = 'This field is required!';
        if (localStorage.getItem('firstName') !== '' &&
            localStorage.getItem('lastName') !== '' &&
            localStorage.getItem('address') !== '' &&
            localStorage.getItem('firstNameError') === '' &&
            localStorage.getItem('lastNameError') === '' &&
            localStorage.getItem('addressError') === '') {
            return 1;
        } else {
            if (localStorage.getItem('firstNameError') !== '' || localStorage.getItem('firstName') === '') {
                localStorage.setItem('firstNameError', error);
            }
            if (localStorage.getItem('lastNameError') !== '' || localStorage.getItem('lastName') === '') {
                localStorage.setItem('lastNameError', error);
            }
            if (localStorage.getItem('addressError') !== '' || localStorage.getItem('address') === '') {
                localStorage.setItem('addressError', error);
            }
            this.forceUpdate();
            return 0;
        }
    }



    handlePayClick() {
        var error = 'This field is required!';
        if (localStorage.getItem('cvv') !== '' &&
            localStorage.getItem('holder') !== '' &&
            localStorage.getItem('number') !== '' &&
            localStorage.getItem('cvvError') === '' &&
            localStorage.getItem('holderError') === '' &&
            localStorage.getItem('numberError') === '' &&
            localStorage.getItem('exp_month') !== '' &&
            localStorage.getItem('exp_year') !== '') {

            axios.post(`/api/Order/FinishOrder`,
                {
                    FirstName: localStorage.getItem('firstName'),
                    LastName: localStorage.getItem('lastName'),
                    Address: localStorage.getItem('address'),
                    PaymentRequest: {
                        Cvv: localStorage.getItem('cvv'),
                        ExpMonth: localStorage.getItem('exp_month'),
                        ExpYear: localStorage.getItem('exp_year'),
                        Holder: localStorage.getItem('holder'),
                        Number: localStorage.getItem('number')
                    }
                })
                .then(res => {
                    localStorage.setItem('response', res.data);
                })
                .catch(error => {
                    localStorage.setItem('responseError', error.response.data);
                });
            return 1;
        } else {
            if (localStorage.getItem('cvvError') !== '' || localStorage.getItem('cvv') === '') {
                localStorage.setItem('cvvError', error);
            }
            if (localStorage.getItem('holderError') !== '' || localStorage.getItem('holder') === '') {
                localStorage.setItem('holderError', error);
            }
            if (localStorage.getItem('numberError') !== '' || localStorage.getItem('number') === '') {
                localStorage.setItem('numberError', error);
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

    getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return (<UserShoppingCart productAmount={this.props.productAmount} handleAmount={this.props.handleAmount} islogged={this.props.islogged} />);
            case 1:
                return (<OrderDetailsForm />);
            case 2:
                return (<Payment />);
            default:
                return 'You\'re a long way from home sonny jim!';
        }
    }
    handleShowing(){
        
    }

    mobileOrderSum(mobile) {
        if (mobile === true) {
            return <RaisedButton
                label='Summary'
                primary={true}
                onClick={this.handleShowing}
            />
        }
        return null;
    }

    render() {
        var floatStepper = 'left';
        var widthStepper = '60%';
        var paddingLeft = '10%';
        var mobile = false;
        if (window.innerWidth <= 450) {
            floatStepper = 'none';
            widthStepper = 'none';
            paddingLeft = 'none';
            mobile = true;
        }
        const { finished, stepIndex } = this.state;
        const contentStyle = { margin: '0 16px' };
        //197 eilute -> , maxWidth: 700
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
                    <div style={{ paddingTop: '2.4%', paddingRight: '10%' }}>
                        <FlatButton
                            label="Back"
                            disabled={stepIndex === 0}
                            onClick={this.handlePrev}
                            style={{ marginRight: 12 }}
                        />
                        <RaisedButton
                            label={stepIndex === 2 ? 'Finish' : 'Next'}
                            primary={true}
                            onClick={this.handleNext}
                        />
                        {this.mobileOrderSum(mobile)}
                    </div>
                </div>
                <div style={contentStyle}>
                    {finished ? (
                        <div>
                            <p> {localStorage.getItem('responseError')}</p>
                            <p> {localStorage.getItem('response')}</p>
                        </div>
                    ) : (
                            <div>

                                <div>{this.getStepContent(stepIndex)}</div>
                            </div>
                        )}
                </div>
            </div>
        );
    }
}

export default HorizontalLinearStepper;