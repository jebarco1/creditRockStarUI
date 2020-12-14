import React, { Component,useState } from 'react';
import {sendData} from '../services/sendData';
import ImageUploader from 'react-images-upload';

class OrderAdd2 extends Component {


    constructor(props) {
        super(props);
         this.state = {
            reportStartDate: '', 
            city : '',
            state : '',
            selectedFile: null,
            spanish: ''
          };
         this.onDrop = this.onDrop.bind(this);
    }
    
   
    getData = () => {
        
         console.log('getdata');

    }
    
    onChange = (e) => {

        this.setState({[e.target.name] : e.target.value});

     }
    
    
     onDrop = event => {

        this.setState({
            selectedFile: event[0]
        });

    }
    
    getZip = (e) => {
        
       if(e.target.value.length == 5 )
       {
           
          let payload = {zip: e.target.value};
              sendData('zipcode', 'POST' , payload).then ((result) => {
              console.log(result[0].City);
              console.log(result[0].State);
              
              this.setState({city: result[0].City});
              this.setState({state: result[0].State});
              this.setState(payload);
              
                
        }); 

       }
    
    }
    
    uploadImage = async (userId, singleFile) => {
    //Check if any file is selected or not
  
    if (singleFile != null) {
      //If file selected then create FormData
      const fileToUpload = singleFile;
      const data = new FormData();
      data.append('name', 'image');
      data.append('image', fileToUpload);
      data.append('userId', userId);
      let res = await fetch(
        'http://127.0.0.1:8000/api/v1/uploadImage',
        {
          method: 'post',
          body: data,
          headers: {},
        }
      );
      let responseJson = await res.json();
      if (responseJson.code == 0) {
        window.location.href = "/Clients";
      }
    } else {
      //if no file selected the show alert
      alert('Please try again. Image upload failure.');
    }
    };

    
   actionAdd = () => {
         
         
         //this.uploadImage(1);
         let newPayload = this.state; 
         let selectedFile = this.state.selectedFile;
         
         delete newPayload.selectedFile;
         
         sendData('addClient', 'POST' , newPayload).then (
                 
             (result) => {
                    this.uploadImage(result.id, selectedFile);
            }); 
         
         

     }
    
    


    componentDidMount()
    {
         let tempDate = new Date();
         let date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +' '+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds(); 
         this.setState({reportStartDate : date});  
    }
    
    
       range = (start, end) => { 
        var returnAr = [];
        for (var i = start; i <= end; i++) {
            returnAr.push(i);
        }
        return returnAr;
    }
      

 
    render() {
        
        const StartYear = 1950;
        const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        const years = this.range(StartYear, new Date().getFullYear());
        const days = this.range(1, 31);


        return (
             <div className="AddDataContainer">
                <span className="checkBox"><input name="spanish" type="checkbox" onChange={this.onChange} name="spanish" /><label for='keyItem' >SPANISH is your preferred language to communicate? <span className="required">*</span></label></span>
                <span><label for='keyItem'>Intake Date <span className="required">*</span></label><input type="text" value={this.state.reportStartDate} disabled/></span>
                  <div className="clientSection clientInformation">
                     <h3>Client Information</h3>
                     <div className="dataInput">
                         <span><label>First Name<span className="required">*</span></label><input name="fname" onChange={this.onChange} type="text" /></span>
                         <span><label>Middle Name <span className="required">*</span></label><input name="mname"onChange={this.onChange} type="text" /></span>
                         <span><label>Last Name<span className="required">*</span></label><input name="lname" onChange={this.onChange} type="text" /></span>
                    </div>
                         <span className="messageText">{this.state.inputMessage}</span>

                     </div>
                 <div className="clientSection clientContact">
            <h3>Client Contact Information</h3>
            <div className="dataInput">
                <span><label for='keyItem'>Address<span className="required">*</span></label><input name="address" onChange={this.onChange}  type="text" /></span>
                <span><label for='keyItem'>City<span className="required">*</span></label><input name="city" value={this.state.city}   type="text" disabled/></span>
                <span><label for='keyItem'>State<span className="required">*</span></label><input name="state" value={this.state.state}   type="text" disabled /></span>
                <span><label for='keyItem'>Zip<span className="required">*</span></label><input name="zip" onChange={this.getZip}  type="text" /></span>
                <span><label for='keyItem'>Mobile Phone <span className="required">*</span></label><input name="mphone" onChange={this.onChange}  type="text" /></span>
                <span><label for='keyItem'>Home Phone <span className="required">*</span></label><input name="hphone" onChange={this.onChange}  type="text" /></span>
                <span><label for='keyItem'>Email <span className="required">*</span></label><input name="email" onChange={this.onChange}  type="text" /></span>
                </div>
                 <span className="messageText">{this.state.inputMessage}</span>

            </div>
            <div className="clientSection clientId">
            <h3>Client Identification Information</h3>
            
             <span><label for='keyItem'>Photo Identification Upload:</label> 
                
                 <ImageUploader
                withIcon={true}
                buttonText={this.state.idText}
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
            />
            <div className="imageDisplay">{this.state.imageDisplay}</div>

            </span>
             <div className="dataInput">
              <span><label for='keyItem'>Photo Type:</label>
                <label for='keyItem'><input type='radio' onChange={this.onChange} value='1' name='rad' class='radio' /> US Federal Passport</label>
                <label for='keyItem'><input type='radio' onChange={this.onChange} value='2' name='rad' class='radio' /> Alien Registration (Green) Card</label>
                <label for='keyItem'><input type='radio' onChange={this.onChange} value='3' name='rad' class='radio' /> State Department of Motor Vehicle Issued</label>
            </span>
            </div>
            
            <div className="dataInput">
                <span>
                    <p>Photo Id Expiration Date:</p>
                   <select name="idExpMonth" onChange={this.onChange} >{months.map(option => { return (<option value={option}>{" "} {option}{" "} </option>);})}</select>
                   <select name="idExpDay" onChange={this.onChange} >{days.map(option => { return (<option value={option}>{" "} {option}{" "} </option>);})}</select>
                   <select name="idExpYear" onChange={this.onChange} >{years.map(option => { return (<option value={option}>{" "} {option}{" "} </option>);})}</select>
                 </span>
             </div>  
             <div className="dataInput">
               <span className="birthDate"><label for='keyItem'>Birthday<span className="required">*</span></label>
               <select name="birthMonth" onChange={this.onChange} >{months.map(option => { return (<option value={option}>{" "} {option}{" "} </option>);})}</select>
               <select name="birthDay" onChange={this.onChange} >{days.map(option => { return (<option value={option}>{" "} {option}{" "} </option>);})}</select>
               <select name="birthYear" onChange={this.onChange} >{years.map(option => { return (<option value={option}>{" "} {option}{" "} </option>);})}</select>
               </span> 
               <span><label for='keyItem'>Mother's Maiden Name<span className="required">*</span></label><input name="maidenName" onChange={this.onChange}   type="text" /></span>
               <span><label for='keyItem'>SSN#<span className="required">*</span></label><input name="ssn" onChange={this.onChange}   type="text" /></span>
             </div>   
              
             <span className="messageText">{this.state.inputMessage}</span>

            </div>
               <div className="clientSection clientQuestions">
            <h3>Client Questions</h3>
            <span>Is your client and Entrepreneur or Business Owner? 
                <label for='keyItem'><input type='radio' onChange={this.onChange} value='1' name='business' class='radio' /> YES, Business Credit or Business Loan Needed</label>
                <label for='keyItem'><input type='radio' onChange={this.onChange} value='2' name='business' class='radio' /> NO </label>
            </span>
            
            
            
             <span><label for='keyItem'>Why is client seeking Credit Restoration?</label>
                <label for='keyItem'><input type='radio' value='1' onChange={this.onChange} name='seeking' class='radio' /> Housing - Home Purchase, Mortgage Re-Finance, or Rental Housing</label>
                <label for='keyItem'><input type='radio' value='2' onChange={this.onChange} name='seeking' class='radio' /> Lifestyle - Automobile or Equipment Financing</label>
                <label for='keyItem'><input type='radio' value='3' onChange={this.onChange} name='seeking' class='radio' /> Clear My Name - Victim of Identity Theft</label>
                <label for='keyItem'><input type='radio' value='4' onChange={this.onChange} name='seeking' class='radio' /> Economic - Employment Related, Security Clearance, Business Loan</label>
            </span>
            <span className="checkBox"><input type="checkbox" onChange={this.onChange} name="in_contract" /><label for='keyItem' >YES, the client "In Contract" or submitting a Mortgage Application for a House Purchase, Re-Finance, or HELOC (Home Equity Line of Credit)? </label></span>
            
            <span className="checkBox"><input type="checkbox" onChange={this.onChange} name="has_credit" /><label for='keyItem' >YES, the client has credit file </label></span>
             <div className="nextButton">
                    <button onClick={this.actionAdd}>Send</button>
                </div>
           </div>
             </div>
         );

    }
    
}

export default OrderAdd2;