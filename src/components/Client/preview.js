import React, { Component,useState } from 'react';
import DatePicker from "react-datepicker";
import ImageUploader from 'react-images-upload';
import {sendData} from '../../services/sendData';

class Preview extends Component {


  constructor(props) {
        super(props);
         this.state = {
            type : 'contact',
            inputMessage : '',
            user: null,
            selectedFile: null,
            payload : [],
            html : null
          };
         this.onDrop = this.onDrop.bind(this);
    }
    

processReport = () => {
        
    let selectedFile = this.state.selectedFile;
    this.uploadImage(this.props.user.id, selectedFile);

}


uploadImage = (userId, singleFile) => {
    //Check if any file is selected or not
  
    if (singleFile != null) {
      //If file selected then create FormData
      const fileToUpload = singleFile;
      const data = new FormData();
      data.append('name', 'image');
      data.append('image', fileToUpload);
      data.append('userId', userId);
      fetch(
        'http://127.0.0.1:8000/api/v1/processCreditReport',
        {
          method: 'post',
          body: data,
          headers: {},
        }
      );
      this.props.action();
    }
     
 };
 
 
  getData = () => {
        console.log(this.props.user.id);
         sendData('processCreditReportTest', 'POST' , {'userId' : this.props.user.id}).then ((result) => {
           let responseJSON = result;
           this.setState({html :responseJSON.html})
        }); 
    }




onDrop = event => {

        this.setState({
            selectedFile: event[0]
        });

}
   


render() {

    let CR = [
        '',
        'Housing - Home Purchase, Mortgage Re-Finance, or Rental Housing',
        'Lifestyle - Automobile or Equipment Financing',
        'Clear My Name - Victim of Identity Theft',
        ' Economic - Employment Related, Security Clearance, Business Loan'  
    ]
    
    const isSeeking = this.props.user.seeking;
    const isBusiness =  this.props.user.business;
    const isInContract =  this.props.user.in_contract;
    
    let userHTML = this.props.userHtml;
    
     
 
    let seeking;
    let business;
    let inContract;
    
    if (isSeeking) {   
        seeking =  <span className="extraDetails">Reason for Credit Restoration :<br/> {CR[this.props.user.seeking]} </span>; 
    } 
    
    if (isBusiness) { 
        business = <span className="extraDetails">Client is a Business Owner or Entrepreneur</span>;
    }
    
    if (isInContract) { 
        inContract = <span className="extraDetails">Client in Contract or submitting a Mortgage Application for a House Purchase, Re-Finance, or HELOC (Home Equity Line of Credit)</span>;
    }
    
   return (
          <div id="clientComponent">
  
           <div className="previewblocks previewLeft">
           <div className="clientSection clientContact">
            <h3>Client Information</h3>
             <div className="information">
             <p> {this.props.user.fname} {this.props.user.mname} {this.props.user.lname}</p>
             <p> {this.props.user.address} <br/> {this.props.user.city} {this.props.user.state} {this.props.user.zip}</p>
             <div> <p> SSN : {this.props.user.SSN} </p>
             <p> DOB : 3/11/1977 </p>
             <p>  Home Phone : {this.props.user.mphone} <br/>
              Home Phone : {this.props.user.hphone} </p></div>
             <div> Email: <a href="mailto:{this.props.user.email}" target="_blank" rel="noopener noreferrer">{this.props.user.email}</a> </div>
           </div>
                <div className="clientSection">

                     <div className="information">
                       {business}
                       {seeking}
                       {inContract}
                    </div>
                </div>
          </div>
            

             <div className="clientSection clientContact">
            <h3>Client Report</h3>
            <div className="information"><div dangerouslySetInnerHTML={{__html: userHTML}}/></div>
           
           
            </div>
            
            
       </div> 
       
        <div className="previewblocks previewRight">
        
        
                <div className="clientSection clientDetails">
                    <h4>Client Status</h4>
                     <div>
                            <p> Step 1: Email Sent</p>
                            <div className="statusBlock">
                            <p>Emails sent - <a className="resentEmail">Resend</a></p>
                            </div>
                    </div>
                    <div>
                        <p> Step 2: Upload Credit Report</p>
                        <ImageUploader
                                withIcon={true}
                                buttonText='update Html File'
                                onChange={this.onDrop}
                                imgExtension={['.html']}
                                maxFileSize={22242880}
                            />
                             <div className="statusBlock">
                                <button onClick={this.processReport}>Process Report</button>   
                             </div>
                    </div>
                    
                      <div>
                            <p> Step 3: Analyse Credit Report</p>
                            <div className="statusBlock">
                            <h4>Average Payment History</h4>
                            <p>Late payments are visible for up to 7 years, but lenders care about them less as they age.</p>
                            <ul className="itemList">
                            <li><span className="listTitle">Late Payment</span><span className="listValue">2</span></li>
                            <li><span className="listTitle">Collection</span><span className="listValue">0</span></li>
                            <li><span className="listTitle">Public Records</span><span className="listValue">0</span></li>
                            </ul>
                            </div>
                    </div>
                </div>
        </div>
       </div>
            
    );

    }
    
}

export default Preview;