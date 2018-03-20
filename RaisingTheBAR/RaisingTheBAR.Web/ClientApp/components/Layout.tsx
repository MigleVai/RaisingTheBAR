import * as React from 'react';
import { NavMenu } from './NavMenu';

export class Layout extends React.Component<{}, {}> {
    public render() {
        return <div className='container-fluid'>
            <nav className="nav navbar navbar-toggleable-sm navbar-light bg-faded">
                <NavMenu />
            </nav>
            <div className='text-center'>
                { this.props.children }
            </div>
        </div>;
    }
}
