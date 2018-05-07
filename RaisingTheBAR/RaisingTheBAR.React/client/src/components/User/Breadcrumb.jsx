import React from 'react';
import { Link } from 'react-router-dom';

export default class Breadcrumb extends React.Component {
    render() {
        const styles = {
            h6Styles: {
                paddingLeft: '5%',
                textAlign: 'left',
                width: '100%',
                marginTop: '20px',
            },
        };
        var pathNames = this.props.pathname.replace('/all', '').replace('/', '').split('/');
        var tempPath = '';
        const amount = pathNames.length;
        const result = pathNames.map(function (item, i) {
            tempPath += "/" + item;
            if (tempPath === '/shop/products') {
                tempPath = '/shop/products/all';
            }
            if (tempPath !== '/shop/products/all' && tempPath.includes('/shop/products/all/')) {
                tempPath = tempPath.replace('/all', '');
            }
            var temp = <span></span>;
            if (amount !== (i + 1)) {
                temp = <span> > </span>;
            }
            return <span key={i}><Link key={i} to={tempPath}>{item.charAt(0).toUpperCase() + item.slice(1)}</Link>{temp}</span>;
        });
        return (
            <div>
                <h5 style={styles.h6Styles}>
                    {result}
                </h5>
            </div>
        )
    }
}