import React from 'react';
import Breadcrumb from '../Breadcrumb';
import Paper from 'material-ui/Paper';
import PersonalInfo from './PersonalInfo';
import PasswordInfo from './PasswordInfo';

export default class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            info: true,
        }
        this.clickInfo = this.clickInfo.bind(this);
        this.clickPass = this.clickPass.bind(this);
    }

    clickInfo() {
        this.refs.personal.style.fontWeight = 'bold';
        this.refs.password.style.fontWeight = 'normal';
        this.setState({ info: true });
    }
    clickPass() {
        this.refs.password.style.fontWeight = 'bold';
        this.refs.personal.style.fontWeight = 'normal';
        this.setState({ info: false });
    }
    render() {
        var windowWidth = window.innerWidth;
        var widthPaper = 'none';
        var floatPaper = 'none';
        var displayPaper = 'block';
        if (windowWidth > 450) {
            widthPaper = '450px';
            floatPaper = 'left';
            displayPaper = 'inline-block';
        }
        const styles = {
            paperStyle: {
                textAlign: 'center',
                display: 'inline-block',
                padding: '5%',
            },
            contentStyle: {
                display: 'inline-block',
                position: 'relative',
                textAlign: 'left',
                paddingLeft: '2%',
            }
        };
        var shown;
        if (this.state.info) {
            shown = <PersonalInfo />;
        } else {
            shown = <PasswordInfo />;
        }
        return (
            <div>
                <Breadcrumb pathname={this.props.location.pathname} />
                <hr />
                <div style={{ margin: 'auto', width: widthPaper, display: 'block' }}>
                    <div style={{ display: displayPaper, float: floatPaper }}>
                        <Paper style={styles.paperStyle} zDepth={1}>
                            {shown}
                        </Paper>
                    </div>
                    <div style={styles.contentStyle}>
                        <div onClick={this.clickInfo} style={{ cursor: 'pointer' }}>
                            <p style={{ fontWeight: 'bold' }} ref="personal">Personal Information</p>
                        </div>
                        <div onClick={this.clickPass} style={{ cursor: 'pointer' }}>
                            <p style={{ fontWeight: 'normal' }} ref="password">Change Password</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}