import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class PersonalInfo extends React.Component {

    render() {
        return (
            <div>
                <form>
                    <p>Name</p> <TextField
                        hintText="Hint Text"
                    />
                    <p>Surname</p><TextField
                        hintText="Hint Text"
                    />
                    <RaisedButton label="Default"/>
                </form>
            </div>
        );
    }
}