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
        const styles = {
            paperStyle: {
                textAlign: 'center',
                display: 'inline-block',
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
                <div style={{ display: 'inline-block', maxWidth: '50%' }}>
                    <Paper style={styles.paperStyle} zDepth={1}>
                        {shown}
                    </Paper>
                </div>
                <div style={{ display: 'inline-block', maxWidth: '30%' }}>
                    <div onClick={this.clickInfo} style={{cursor: 'pointer'}}>
                        <p style={{fontWeight: 'bold'}} ref="personal">Personal Information</p>
                    </div>
                    <div onClick={this.clickPass} style={{cursor: 'pointer'}}>
                        <p style={{fontWeight: 'normal'}} ref="password">Change Password</p>
                    </div>
                </div>
            </div>
        );
    }
}