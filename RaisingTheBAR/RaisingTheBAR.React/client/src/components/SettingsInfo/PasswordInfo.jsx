import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class PersonalInfo extends React.Component {

    render() {
        return (
            <div>
                <form>
                    <p>Old Password</p> <TextField
                        hintText="Hint Text"
                    />
                    <p>New Password</p><TextField
                        hintText="Hint Text"
                    />
                    <p>Repeat New Password</p><TextField
                        hintText="Hint Text"
                    />
                    <RaisedButton label="Default" />
                </form>
            </div>
        );
    }
}