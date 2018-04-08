import React from 'react';

export default class Breadcrumb extends React.Component {
    render() {
        const styles = {
            errorStyle: {
                fontWeight: 'bold',
                backgroundColor: '#F7B2AD',
                border: 'solid',
                borderWidth: 'thin'
            }
        };
        if (this.props.responseError === '') {
            return null;
        } else {
            return (
                <div style={styles.errorStyle}>
                    {this.props.responseError}
                </div>
            );
        }
    }
}