import React from 'react';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';


export default class AdminPanel extends React.Component {

    render() {
        const styles =
            {
                labelStyle: {
                    fontWeight: 'bold',
                    textTransform: 'none'
                },
                buttonStyle: {
                    marginTop: '8%',
                },
                displayStyle:{
                    display:'inline-flex'
                },
            }

        return (
            <div style={styles.displayStyle}>
                <Link to="/admin/userlist" ><FlatButton label="User list"/></Link>
                <Link to="/admin/editproducts" ><FlatButton label="Edit products"/></Link>
            </div>
        );
    }
}