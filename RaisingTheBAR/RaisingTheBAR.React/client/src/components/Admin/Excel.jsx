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
      rejected: [],
      base64Files: []
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
  handleExcelImport() {
    var importUri = '/api/Administrator/ImportFromExcel';
    if (this.state.base64Files.length > 0) {
      this.state.base64Files.forEach(base64 => {
        console.log(base64)
          axios.post(importUri, {excelBase64 : base64}
        ).catch(error => {
          console.log("error with importing excel!")
          console.log(error)
        })
      })
    }
  }

  //   const uploads = this.state.accepted.map(file => {
  //     return axios.post('/api/Administrator/ImportFromExcel', formData, {
  //       headers: { "X-Requested-With": "XMLHttpRequest" },
  //     }).then(response => {
  //       const data = response.data;
  //       const fileURL = data.secure_url // You should store this URL for future references in your app
  //       console.log(data);
  //     })
  //   });

  //   // Once all the files are uploaded 
  //   axios.all(uploaders).then(() => {
  //     // ... perform after upload is successful operation
  //   });
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
  onDrop(accepted, rejected) {
    accepted.forEach(file => {
      var fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (e) => {
        var dataUrl = e.target.result;
        const base64Data = dataUrl.substr(dataUrl.indexOf('base64,') + 'base64,'.length);
        this.setState({
          base64Files: [...this.state.base64Files, base64Data]
        })
      }
    })

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
  }
  render() {
    return (
      <div>
        <span style={{display: 'flex', justifyContent: 'center', fontSize: 20, fontWeight: 'bold'}}> Downloads: </span>
        <FlatButton label="Export products" onClick={this.handleExcelExport} />
        <FlatButton label="Download template" onClick={this.handleExcelTemplateDownload} />
        <Card>
          <FlatButton style={{ margin: 20 + 'px', backgroundColor: "#00FF00" }} label="Import excel files" onClick={this.handleExcelImport.bind(this)} />
          <section>
            <div style={{ display: 'flex', justifyContent: 'center' }} className="dropzone">
              <Dropzone

                onDrop={(accepted, rejected) => {
                  this.onDrop(accepted, rejected)
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
                    : "Drop your .xlsx files here, or click to select files to upload.";
                }}
              </Dropzone>
            </div>
            <aside>
              <h2>Accepted files</h2>
              <ul>
                {
                  this.renderAccepted().length ? this.renderAccepted() : "No accepted files yet"
                }
              </ul>
              <h2>Rejected files</h2>
              <ul>
                {
                  this.renderRejected().length ? this.renderRejected() : "No rejected files yet"
                }
              </ul>
            </aside>
          </section>
        </Card>
      </div >

    )
  }
}