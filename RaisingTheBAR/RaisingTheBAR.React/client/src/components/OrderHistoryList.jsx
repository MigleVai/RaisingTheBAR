import React from "react";
import axios from 'axios';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

export default class OrderHistory extends React.Component {
    // constructor() {
    //     super();
    //     this.state = {
    //     };
    // }
    // handleLoggingChange(props) {
    //     axios.post(`/api/User/UpdateUserData`, {
    //         FirstName: this.state.firstname,
    //         LastName: this.state.lastname
    //     })
    //         .then(res => {
    //         })
    //         .catch(function (error) {
    //             // show error
    //         });
    // }
    // render() {
    //     const columns = [
    //         {
    //             Header: "Order Date",
    //             accessor: "date"
    //         },
    //         {
    //             Header: "Amount",
    //             accessor: "amount"
    //         },
    //         {
    //             Header: "Total Cost",
    //             accessor: "cost"
    //         },
    //         {
    //             Header: "Status",
    //             accessor: "status",
    //         }
    //     ];
    //     const { data } = this.state;
    //     return (
    //         <div>
    //             <ReactTable
    //                 data={data}
    //                 columns={columns}
    //                 defaultPageSize={10}
    //                 className="-striped -highlight"
    //                 SubComponent={row => {
    //                     return (
    //                         <div style={{ padding: "20px" }}>
    //                             <em>
    //                                 You can put any component you want here, even another React
    //                                 Table!
    //             </em>
    //                             <br />
    //                             <br />
    //                             <ReactTable
    //                                 data={data}
    //                                 columns={columns}
    //                                 defaultPageSize={3}
    //                                 showPagination={false}
    //                                 SubComponent={row => {
    //                                     return (
    //                                         <div style={{ padding: "20px" }}>
    //                                             Another Sub Component!
    //                   </div>
    //                                     );
    //                                 }}
    //                             />
    //                         </div>
    //                     );
    //                 }}
    //             />
    //             <br />
    //             <Tips />
    //             <Logo />
    //         </div>
    //     );
    // }
}
