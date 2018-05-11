import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import axios from 'axios';
import Dropzone from 'react-dropzone'
import { Card } from 'material-ui/Card';

export default class Excel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accepted: [],
      rejected: []
    }
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
  // @@@@@@@@@@@ here update 
  // handleExcelImport() {
  //   axios({
  //     url: '/api/Administrator/ImportFromExcel',
  //     method: 'GET',
  //     responseType: 'blob', // important
  //   }).then((response) => {
  //     const url = window.URL.createObjectURL(new Blob([response.data]));
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.setAttribute('download', 'generated-excel.xlsx');
  //     document.body.appendChild(link);
  //     link.click();
  //   });
  // }
  // onDrop(acceptedFiles) {
  //   var temp = acceptedFiles.slice()
  //   var newFiles = this.state.acceptedFiles.slice();
  //   newFiles.push(temp);
  //   this.setState({ acceptedFiles: newFiles })

  // }
  renderAccepted() {
    return this.state.accepted.map(b =>
      b.map(f =>
        <li key={f.name}>{f.name} - {f.size} bytes</li>
      )
    )
  }
  renderRejected() {
    return this.state.rejected.map(b =>
      b.map(f =>
        <li key={f.name}>{f.name} - {f.size} bytes</li>
      )
    )
  }
  render() {
    console.log(this.state.accepted)
    console.log(this.state.rejected)

    return (
      <div>
        <FlatButton label="Export products" onClick={this.handleExcelExport} />
        <FlatButton label="Download product import template" onClick={this.handleExcelTemplateDownload} />
        <FlatButton label="Import products" onClick={this.handleExcelImport} />
        <Card>
          <section>
            <div className="dropzone">
              <Dropzone
                onDrop={(accepted, rejected) => {
                  if (rejected.length !== 0) {
                    this.setState(prevState => ({
                      rejected: [...prevState.rejected, rejected]
                    }))
                  }
                  if (accepted.length !== 0) {
                    this.setState(prevState => ({
                      accepted: [...prevState.accepted, accepted]
                    }))
                  }
                  // var tempAccepted = accepted.slice()
                  // var tempRejected = rejected.slice()
                  // var newAccepted = this.state.accepted.slice();
                  // var newRejected = this.state.rejected.slice();
                  // newAccepted.push(tempAccepted);
                  // newRejected.push(tempRejected);
                  // this.setState({
                  //   accepted: newAccepted,
                  //   rejected: newRejected
                  // })
                }}
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
                {({ isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
                  if (isDragActive) {
                    return "This file is authorized";
                  }
                  if (isDragReject) {
                    return "This file is not authorized";
                  }
                  return acceptedFiles.length || rejectedFiles.length
                    ? `Accepted ${acceptedFiles.length}, rejected ${rejectedFiles.length} files`
                    : "Try dropping some files, or click to select files to upload.";
                }}
              </Dropzone>
            </div>
            <aside>
              <h2>Accepted files</h2>
              <ul>
                {this.renderAccepted}
              </ul>
              <h2>Rejected files</h2>
              <ul>
                {this.renderRejected}
              </ul>
            </aside>
          </section>
        </Card>
      </div>

    )
  }

}