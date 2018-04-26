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

class HorizontalLinearStepper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            finished: false,
            stepIndex: 0
        }
    }

    componentDidMount() {
        if (localStorage.getItem('cvv')) {
            localStorage.setItem('cvv', '')
        }
        if (localStorage.getItem('exp_month')) {
            localStorage.setItem('exp_month', '')
        }
        if (localStorage.getItem('exp_year')) {
            localStorage.setItem('exp_year', '')
        }
        if (localStorage.getItem('firstName')) {
            localStorage.setItem('firstName', '')
        }
        if (localStorage.getItem('lastName')) {
            localStorage.setItem('lastName', '')
        }
        if (localStorage.getItem('holder')) {
            localStorage.setItem('holder', '')
        }
        if (localStorage.getItem('number')) {
            localStorage.setItem('number', '')
        }
        if (localStorage.getItem('address')) {
            localStorage.setItem('address', '')
        }
        if (localStorage.getItem('cvvError')) {
            localStorage.setItem('cvvError', '')
        }
        if (localStorage.getItem('firstNameError')) {
            localStorage.setItem('firstNameError', '')
        }
        if (localStorage.getItem('lastNameError')) {
            localStorage.setItem('lastNameError', '')
        }
        if (localStorage.getItem('holderError')) {
            localStorage.setItem('holderError', '')
        }
        if (localStorage.getItem('numberError')) {
            localStorage.setItem('numberError', '')
        }
        if (localStorage.getItem('addressError')) {
            localStorage.setItem('addressError', '')
        }
    }

    handleNext = () => {
        const { stepIndex } = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 2,
        });
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
                return (<UserShoppingCart/>);
            case 1:
                return (<OrderDetailsForm/>);
            case 2:
                return (<Payment/>);
            default:
                return 'You\'re a long way from home sonny jim!';
        }
    }

    render() {
        const { finished, stepIndex } = this.state;
        const contentStyle = { margin: '0 16px' };

        return (
            <div style={{ width: '100%', maxWidth: 700, margin: 'auto' }}>
                <Breadcrumb pathname={this.props.location.pathname} />
                <Stepper activeStep={stepIndex}>
                    <Step>
                        <StepLabel>Shopping cart</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Order details</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Payment</StepLabel>
                    </Step>
                </Stepper>
                <div style={contentStyle}>
                    {finished ? (
                        <p>
                            <a
                                href="#"
                                onClick={(event) => {
                                    event.preventDefault();
                                    this.setState({ stepIndex: 0, finished: false });
                                }}
                            >
                                Click here
              </a> to reset the example.
            </p>
                    ) : (
                            <div>
                                
                                <p>{this.getStepContent(stepIndex)}</p>
                                <div style={{ marginTop: 12 }}>
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
                                </div>
                            </div>
                        )}
                </div>
            </div>
        );
    }
}

export default HorizontalLinearStepper;