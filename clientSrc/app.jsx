import "./index.ejs";
import "./css/style.less";

import fetch from "isomorphic-fetch";
import React from "react";
import ReactDom from "react-dom";

class FormCsv extends React.Component {
    constructor(){
        super();
        this.state = {
            ErrorMessage: ""
        };
        //this.handleFile = this.handleFile.bind(this);
    }
    // prevent form from submitting; we are going to capture the file contents
    handleSubmit(e) {
        e.preventDefault();
    }

    // when a file is passed to the input field, retrieve the contents as a
    // base64-encoded data URI and save it to the component's state
    handleFile(e, self) {

        let data = e.target.files[0];
        let formdata = new FormData();
        formdata.append("csv", data);
        self.setState({ErrorMessage: "Loading and reading..."});

        fetch('/upload', {
            method: 'post',
            body: formdata
        }).then(response => {
            if (response.status >= 400) throw new Error("Error upload file");
            return response.text();
        }).then(req => {
            self.setState({ErrorMessage: req});
        })
            .catch(error => {
                self.setState({ErrorMessage: error});
                return error;
            });
    }

    render() {
        let message = (this.state.ErrorMessage) ? <div className="mess">{this.state.ErrorMessage}</div> : "";
        return (
            <div className="form">
                <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                    <input type="file" name="csv" onChange={(e)=>this.handleFile(e, this)}/>
                </form>
                {message}
            </div>
        );
    }
}

ReactDom.render(<FormCsv/>, window.document.getElementById("app"));

