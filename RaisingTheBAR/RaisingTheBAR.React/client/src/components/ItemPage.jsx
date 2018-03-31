import React from 'react';
import ReactTable from 'react-table';
import axios from 'axios';
import "react-table/react-table.css";
import IconButton from 'material-ui/IconButton';
import AddShopppingCart from 'material-ui/svg-icons/action/add-shopping-cart';
import {Link} from 'react-router-dom';

export default class ItemPage extends React.Component {
    state = {
        products: []
    }
    componentDidMount() {
        axios.get(`/api/Product/GetAllProducts`)
            .then(res => {
                const products = res.data;
                this.setState({ products });
            })
            .catch(function (error) {
                // show error
            });
    }

    render() {
        const styles = {
            tdStyles: {
                margin: 'auto',
            },
            h6Styles:{
                float: 'left',
                paddingLeft: '5%'
            },
        };
        const data = this.state.products;

        const columns = [
            {
                Header: 'Name',
                accessor: 'name',
                style: styles.tdStyles,
                resizable: false
            }, {
                Header: 'Price',
                accessor: 'price',
                style: styles.tdStyles,
                maxWidth: 200,
                resizable: false                
            },
            {
                Header: "Status",
                Cell: row => {
                    return <div><IconButton><AddShopppingCart /></IconButton></div>
                },
                id: "id",
                sortable: false,
                maxWidth: 100,
                resizable: false                
            }
        ];

        var pathNames = this.props.location.pathname.replace("/", " || ").slice(0,-1);
        var path = pathNames.replace(new RegExp("/", "g"), " > ");
        const home = "Home";

        return (
            <div>
                <div>
                    <h5 style={styles.h6Styles}><Link to={"/"}>{home}</Link>{path}</h5>
                </div>
                < ReactTable
                    data={data}
                    columns={columns}
                    defaultPageSize={10}
                    className="-striped -highlight"
                    style={{display:'initial'}}
                />
            </div>
        )
    }
}