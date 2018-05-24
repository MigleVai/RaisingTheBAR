import React from 'react';
import Breadcrumb from '../Breadcrumb';
import Paper from 'material-ui/Paper';
import PersonalInfo from './PersonalInfo';
import PasswordInfo from './PasswordInfo';
import YourInfo from './YourInfo';

export default class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            info: false,
            your: true,
            pass: false
        }
        this.clickInfo = this.clickInfo.bind(this);
        this.clickPass = this.clickPass.bind(this);
        this.clickYour = this.clickYour.bind(this);
    }

    clickInfo() {
        this.refs.personal.style.fontWeight = 'bold';
        this.refs.personal.style.textDecoration = 'underline';
        this.refs.password.style.fontWeight = 'normal';
        this.refs.password.style.textDecoration = 'none';
        this.refs.your.style.fontWeight = 'normal';
        this.refs.your.style.textDecoration = 'none';
        this.setState({ info: true });
        this.setState({pass: false});
        this.setState({your: false});
    }
    clickPass() {
        this.refs.password.style.fontWeight = 'bold';
        this.refs.password.style.textDecoration = 'underline';
        this.refs.personal.style.fontWeight = 'normal';
        this.refs.personal.style.textDecoration = 'none';
        this.refs.your.style.fontWeight = 'normal';
        this.refs.your.style.textDecoration = 'none';
        this.setState({ info: false });
        this.setState({pass: true});
        this.setState({your: false});
    }
    clickYour(){
        this.refs.your.style.fontWeight = 'bold';
        this.refs.your.style.textDecoration = 'underline';
        this.refs.personal.style.fontWeight = 'normal';
        this.refs.personal.style.textDecoration = 'none';
        this.refs.password.style.fontWeight = 'normal';
        this.refs.password.style.textDecoration = 'none';
        this.setState({ info: false });
        this.setState({pass: false});
        this.setState({your: true});
    }
    render() {
        var windowWidth = window.innerWidth;
        var widthPaper = 'none';
        var floatPaper = 'none';
        var displayPaper = 'block';
        var displayContent = 'block';
        var topPaddingcContent = 'none';
        var divPaperWidth = '';
        var textAlign = 'none';
        var paddingTextR = '';
        var paddingTextL = '';
        if (windowWidth > 450) {
            divPaperWidth = '59%';
            widthPaper = '450px';
            floatPaper = 'right';
            displayPaper = 'inline-block';
            topPaddingcContent = '5%';
            displayContent = 'inline-block';
            textAlign = 'left';
            paddingTextR = '3%';
        }
        const styles = {
            paperStyle: {
                textAlign: 'center',
                display: 'inline-block',
                padding: '5%',
            },
            contentStyle: {
                display: displayContent,
                position: 'relative',
                textAlign: textAlign,
                paddingRight: paddingTextR,
                fontSize: '18px',
                paddingTop: topPaddingcContent,
               // paddingLeft: paddingLeftContent
            }
        };
        var shown;
        if (this.state.info) {
            shown = <PersonalInfo />;
        }
        if(this.state.pass){
            shown = <PasswordInfo />;
        }
        if(this.state.your){
            shown = <YourInfo islogged={this.props.islogged}/>;
        }
        return (
            <div>
                <Breadcrumb pathname={this.props.location.pathname} />
                <hr />
                <div style={{ margin: 'auto', width: widthPaper, display: 'block' }}>
                    <div style={styles.contentStyle}>
                        <div onClick={this.clickYour} style={{ cursor: 'pointer' }}>
                            <p style={{ fontWeight: 'bold', textDecoration: 'underline' }} ref="your">Your Information</p>
                        </div>
                        <div onClick={this.clickInfo} style={{ cursor: 'pointer' }}>
                            <p style={{ fontWeight: 'normal' }} ref="personal">Change Information</p>
                        </div>
                        <div onClick={this.clickPass} style={{ cursor: 'pointer' }}>
                            <p style={{ fontWeight: 'normal' }} ref="password">Change Password</p>
                        </div>
                    </div>
                    <div style={{ display: displayPaper, float: floatPaper, width: divPaperWidth }}>
                        <Paper style={styles.paperStyle} zDepth={1}>
                            {shown}
                        </Paper>
                    </div>
                </div>
            </div>
        );
    }
}