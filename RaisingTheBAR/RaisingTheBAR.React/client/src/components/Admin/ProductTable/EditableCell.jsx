import React from 'react';
export default class EditableCell extends React.Component {

    render() {
        return (
            <td >
                <input style={{display:"table-cell", width:100 + "%"}} type='text' name={this.props.cellData.type} id={this.props.cellData.id} value={this.props.cellData.value} onChange={this.props.onProductTableUpdate} />
            </td>
        );

    }

}