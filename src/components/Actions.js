import React, { Component } from 'react';

class Actions extends Component {

    handleDelete = () => {
        this.props.actionDelete(this.props.element);          
    }
    
    handlePreview = () => {
        this.props.previewClient(this.props.data);          
    }
    
    uploadCCReport = () => {
        
        console.log('uploadreport');
    }
 
   
    render() {
       
        return (
                <div>
                    <button className="actionButton btn-sm btn-dark btn btn-secondary" onClick={this.handlePreview} >Preview</button>
                    <button className="actionButton btn-sm btn-dark btn btn-secondary" onClick={this.uploadCCReport} >Upload Report</button>
                </div>
          )
                
    }
    
}

export default Actions;