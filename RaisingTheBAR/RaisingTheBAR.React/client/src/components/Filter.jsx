import React from 'react';
import Drawer from 'material-ui/Drawer';
import MaterialIcon from 'material-icons-react';

export default class Filter extends React.Component {

    constructor(props) {
        super(props);
        this.state = { open: false };
    }

    handleToggle = () => this.setState({ open: !this.state.open });

    render() {
        return (
            <div>
                <MaterialIcon
                    icon="filter_list"
                    onClick={this.handleToggle}
                />
                <Drawer width={200} openSecondary={true} open={this.state.open} >
                    <h3>Filter</h3>
                </Drawer>
            </div>
        );
    }
}