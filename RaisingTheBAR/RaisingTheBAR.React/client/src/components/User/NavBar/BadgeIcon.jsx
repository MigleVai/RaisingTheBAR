import React from 'react';
import { Link } from 'react-router-dom';
import ShopppingCart from 'material-ui/svg-icons/action/shopping-cart';
import IconButton from 'material-ui/IconButton';
import Badge from 'material-ui/Badge';

export default class BadgeIcon extends React.Component {
    render() {
        const styles =
            {
                badgeStyle: {
                    padding: 'none',
                    paddingRight: '24px',
                }
            }
        return (
            <div >
                <Link to="/shop/stepper" >
                    <Badge
                        badgeContent={this.props.productAmount}
                        primary={true}
                        badgeStyle={{ right: 12 }}
                        style={styles.badgeStyle}
                    >
                        <IconButton>
                            <ShopppingCart />
                        </IconButton>
                    </Badge>
                </Link>
            </div>
        );
    }
}