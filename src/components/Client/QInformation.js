import React, { Component,useState } from 'react';
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";
 import { registerLocale, setDefaultLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';

class QInformation extends Component {


    state = {
            type : 'Q',
            inputMessage : '',
           };
  
 
       
    handleChange = () => {

    }
    
    
    onChange = (e) => {
        this.setState({[e.target.name] : e.target.value});
     }
     
    validation = () => {
         
         let fields = [];
         let result = true;
  
        fields.map((column) => {
                if(!this.state[column])
                {
                   result = false;
                } 
        });
        
        if(result == true)
        {
            this.props.action(this.state.type,this.state);
        } else {
            this.setState({inputMessage : 'All fields required!'});
        }
     }
  
      
      
    componentDidMount()
    {
         let tempDate = new Date();
    }
    
     

    
 
    render() {

 

   return (
      
           <div className="clientSection clientQuestions">
            <h3>Client Questions</h3>
            <span>Is your client and Entrepreneur or Business Owner? 
                <label for='keyItem'><input type='radio' value='1' name='rad' class='radio' /> YES, Business Credit or Business Loan Needed</label>
                <label for='keyItem'><input type='radio' value='2' name='rad' class='radio' /> NO </label>
            </span>
            
            
            
             <span><label for='keyItem'>Why is client seeking Credit Restoration?</label>
                <label for='keyItem'><input type='radio' value='1' name='rad' class='radio' /> Housing - Home Purchase, Mortgage Re-Finance, or Rental Housing</label>
                <label for='keyItem'><input type='radio' value='2' name='rad' class='radio' /> Lifestyle - Automobile or Equipment Financing</label>
                <label for='keyItem'><input type='radio' value='1' name='rad' class='radio' /> Clear My Name - Victim of Identity Theft</label>
                <label for='keyItem'><input type='radio' value='1' name='rad' class='radio' /> Economic - Employment Related, Security Clearance, Business Loan</label>
            </span>
            <span className="checkBox"><input type="checkbox" /><label for='keyItem' >YES, the client "In Contract" or submitting a Mortgage Application for a House Purchase, Re-Finance, or HELOC (Home Equity Line of Credit)? </label></span>
            
            <span className="checkBox"><input type="checkbox" /><label for='keyItem' >YES, the client has credit file </label></span>
             <div className="nextButton">
                    <button onClick={this.validation}>Send</button>
                </div>
           </div>

 );

    }
    
}

export default QInformation ;