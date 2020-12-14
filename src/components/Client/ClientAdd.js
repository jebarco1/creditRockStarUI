import React, { Component,useState } from 'react';
import {sendData} from '../services/sendData';
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";
 import { registerLocale, setDefaultLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';

class OrderAdd extends Component {


    state = {
            client : [],
            reportStartDate: ''
           };
  
 
       
    handleChange = () => {

    }
    
    
    onChange = (e) => {

    

     }
      
      
    componentDidMount()
    {
         let tempDate = new Date();
         let date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +' '+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds(); 
         this.setState({reportStartDate : date});  
    }
    
     

    
 
    render() {

 

   return (
        <div className="AddDataContainer">
 <span className="checkBox"><input type="checkbox" /><label for='keyItem' >SPANISH is your preferred language to communicate? <span className="required">*</span></label></span>
            <span><label for='keyItem'>Intake Date <span className="required">*</span></label><input type="text" value={this.state.reportStartDate} disabled/></span>
            <div className="clientSection clientInformation">
            <h3>Client Information</h3>
                <span><label for='keyItem'>First Name<span className="required">*</span></label><input type="text" /></span>
                <span><label for='keyItem'>Middle Name <span className="required">*</span></label><input type="text" /></span>
                <span><label for='keyItem'>Last Name<span className="required">*</span></label><input type="text" /></span>
                
                    <button>next step >></button>
            </div>
            <div className="clientSection clientContact">
            <h3>Client Contact Information</h3>
                <span><label for='keyItem'>Address<span className="required">*</span></label><input type="text" /></span>
                <span><label for='keyItem'>City<span className="required">*</span></label><input type="text" /></span>
                <span><label for='keyItem'>State<span className="required">*</span></label><input type="text" /></span>
                <span><label for='keyItem'>Zip<span className="required">*</span></label><input type="text" /></span>
                <span><label for='keyItem'>Mobile Phone <span className="required">*</span></label><input type="text" /></span>
                <span><label for='keyItem'>Home Phone <span className="required">*</span></label><input type="text" /></span>
                <span><label for='keyItem'>Email <span className="required">*</span></label><input type="text" /></span>
                <button>next step >></button>
            </div>
            <div className="clientSection clientId">
            <h3>Client Idenfication Information</h3>
               <span className="birthDate"><label for='keyItem'>Birthday<span className="required">*</span></label><input type="text" /><input type="text" /><input type="text" /></span> 
                <span><label for='keyItem'>Mother's Maiden Name<span className="required">*</span></label><input type="text" /></span>
                <span><label for='keyItem'>SSN#<span className="required">*</span></label><input type="text" /></span>
                <span><label for='keyItem'>Photo Identification Expiration<span className="required">*</span></label><DatePicker name="intake_date"  onChange={this.onChange} locale="es" /></span>
                     <button>next step >></button>
            </div>
            <div className="clientSection clientQuestions">
            <h3>Client Questions</h3>
            <span>Is your client and Entrepreneur or Business Owner? 
                <label for='keyItem'><input type='radio' value='1' name='rad' class='radio' /> YES, Business Credit or Business Loan Needed</label>
                <label for='keyItem'><input type='radio' value='2' name='rad' class='radio' /> NO </label>
            </span>
            
              <span><label for='keyItem'>Photo Identification</label>
                <label for='keyItem'><input type='radio' value='1' name='rad' class='radio' /> US Federal Passport</label>
                <label for='keyItem'><input type='radio' value='2' name='rad' class='radio' /> Alien Registration (Green) Card</label>
                <label for='keyItem'><input type='radio' value='1' name='rad' class='radio' /> State Department of Motor Vehicle Issued</label>
            </span>
            
             <span><label for='keyItem'>Why is client seeking Credit Restoration?</label>
                <label for='keyItem'><input type='radio' value='1' name='rad' class='radio' /> Housing - Home Purchase, Mortgage Re-Finance, or Rental Housing</label>
                <label for='keyItem'><input type='radio' value='2' name='rad' class='radio' /> Lifestyle - Automobile or Equipment Financing</label>
                <label for='keyItem'><input type='radio' value='1' name='rad' class='radio' /> Clear My Name - Victim of Identity Theft</label>
                <label for='keyItem'><input type='radio' value='1' name='rad' class='radio' /> Economic - Employment Related, Security Clearance, Business Loan</label>
            </span>
            <span className="checkBox"><input type="checkbox" /><label for='keyItem' >YES, the client "In Contract" or submitting a Mortgage Application for a House Purchase, Re-Finance, or HELOC (Home Equity Line of Credit)? </label></span>
            
            <span className="checkBox"><input type="checkbox" /><label for='keyItem' >YES, the client has credit file </label></span>
             <button onClick={this.handleChange}>Create</button>
           </div>
            
         </div>
    );

    }
    
}

export default OrderAdd;