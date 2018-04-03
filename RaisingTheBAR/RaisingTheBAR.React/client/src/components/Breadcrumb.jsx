import React from 'react';
import { Link } from 'react-router-dom';

export default class Breadcrumb extends React.Component {
    // constructor(props){
    //     super(props);
    //     this.state = {pathname: ''};
    // }
    render() {
        const styles={
            h6Styles: {
                float: 'left',
                paddingLeft: '5%'
            },
        };
        var pathNames = this.props.pathname.replace("/", " || ").slice(0, -1);
        var path = pathNames.replace(new RegExp("/", "g"), " > ");
        const home = "Home";

        return (
            <div>
                <h5 style={styles.h6Styles}><Link to={"/"}>{home}</Link>{path}</h5>
            </div>
        )
    }
}