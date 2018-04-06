import React from 'react';
import { Link } from 'react-router-dom';

export default class Breadcrumb extends React.Component {
    render() {
        const styles={
            h6Styles: {
                paddingLeft: '5%',
                textAlign: 'left',
                width: '100%'
            },
        };
        var pathNames = this.props.pathname.replace('/all', '').replace('/', '').split('/');
        var tempPath = '';
        const result = pathNames.map(function(item, i){
            tempPath += "/" + item;
            if(tempPath === '/products')
            {
                tempPath = '/products/all';
            }
            if(tempPath !== '/products/all' && tempPath.includes('/products/all/'))
            {
                tempPath = tempPath.replace('/all','');
            }
            return <span key={i}> > <Link key={i} to={tempPath}>{item.charAt(0).toUpperCase() + item.slice(1)}</Link></span>;
        });
        return (
            <div>
                <h5 style={styles.h6Styles}>
                <Link to={"/"}>Home</Link>{result}
                </h5>
            </div>
        )
    }
}