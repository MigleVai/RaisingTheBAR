import React from 'react';
import AdminProductRow from './AdminProductRow';

export default class AdminProductTable extends React.Component {

    render() {
        var onProductTableUpdate = this.props.onProductTableUpdate;
        var rowDel = this.props.onRowDel;
        var filterText = this.props.filterText;
        var product = this.props.products.map(function (product) {
            if (product.name.indexOf(filterText) === -1) {
                return;
            }
            return (<AdminProductRow onProductTableUpdate={onProductTableUpdate} product={product} onDelEvent={rowDel.bind(this)} key={product.id} />)
        });
        return (
            <div>
                <button type="button" onClick={this.props.onRowAdd} className="btn btn-success pull-right">Add</button>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th>Image base64</th>
                            <th>Id</th>
                            <th>Featured</th>
                        </tr>
                    </thead>

                    <tbody>
                        {product}

                    </tbody>

                </table>
            </div>
        );
    }
}