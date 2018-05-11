import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import axios from 'axios';

export default class Excel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  handleExcelExport() {
    axios({
      url: '/api/Administrator/GenerateExcel',
      method: 'GET',
      responseType: 'blob', // important
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'generated-excel.xlsx');
      document.body.appendChild(link);
      link.click();
    });
  }
  handleExcelTemplateDownload() {
    axios({
      url: '/api/Administrator/ProductImportTemplate',
      method: 'GET',
      responseType: 'blob', // important
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'excel-template.xlsx');
      document.body.appendChild(link);
      link.click();
    });
  }

  render() {
    return (
      <div>
        <FlatButton label="Export products" onClick={this.handleExcelExport} />
        <FlatButton label="Download product import template" onClick={this.handleExcelTemplateDownload} />
      </div>
    )
  }

}