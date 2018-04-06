import React from 'react';
import Breadcrumb from '../Breadcrumb';
import Paper from 'material-ui/Paper';
import PersonalInfo from './PersonalInfo';
import PasswordInfo from './PasswordInfo';

export default class Settings extends React.Component {

    render() {
        const style = {
            // height: '50%',
            // width: 100,
            // margin: 20,
            textAlign: 'center',
            display: 'inline-block',
        };
        return (
            <div>
                <Breadcrumb pathname={this.props.location.pathname} />
                <hr />
                <div style={{ display: 'inline-block', maxWidth: '50%' }}>
                    <Paper style={style} zDepth={1}>
                        <PersonalInfo />
                    </Paper>
                </div>
                <div style={{ display: 'inline-block', maxWidth: '30%' }}>
                    {/* <div onClick={}>
                        <p>Personal Information</p>
                    </div> */}
                    <p>Change Password</p>
                </div>
            </div>
        );
    }
}