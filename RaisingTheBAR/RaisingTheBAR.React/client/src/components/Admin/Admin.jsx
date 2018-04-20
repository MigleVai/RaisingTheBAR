import React from 'react';
import UserList from './UserList';
import AdminPanel from './AdminPanel';
import EditProducts from './ProductTable/EditProducts';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { Link, Route } from 'react-router-dom';

export default class Admin extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const styles = {
            title: {
              cursor: 'default',
            },
            align: {
              textAlign: 'left',
            },
            textStyle: {
              textTransform: 'none',
            },
            barStyle: {
              backgroundColor: '#929292'
            }
          };
        return (
            <div>
                <AppBar
                    title={<Link to={"/admin"}><FlatButton hoverColor='none' labelStyle={styles.textStyle} label="Raising the BAR" /></Link>}
                    titleStyle={styles.align}
                    iconElementRight={<AdminPanel handleLogging={this.props.handleLogging} islogged={this.props.islogged} />}
                    style={styles.barStyle}
                >
                </AppBar>
                <h1>Admin page!</h1>
                <Route path="/admin/userlist" component={UserList}/>
                <Route path="/admin/editproducts" component={EditProducts}/>

            </div>
        )
    }
}