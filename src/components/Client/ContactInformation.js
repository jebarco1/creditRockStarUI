import React, { Component,useState } from 'react';
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";
 import { registerLocale, setDefaultLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';

class ContactInformation extends Component {


    state = {
            type : 'contact',
            inputMessage : '',
           };
  

    
    onChange = (e) => {
        this.setState({[e.target.name] : e.target.value});
     }
     
     validation = () => {
         
         let fields = ['address', 'city', 'state', 'zip', 'mphone', 'hphone', 'email'];
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


render() {

 

   return (
      
           <div className="clientSection clientContact">
            <h3>Client Contact Information</h3>
             <div className="dataInput">
                <span><label for='keyItem'>Address<span className="required">*</span></label><input name="address" onChange={this.onChange}  type="text" /></span>
                <span><label for='keyItem'>City<span className="required">*</span></label><input name="city" onChange={this.onChange}  type="text" /></span>
                <span><label for='keyItem'>State<span className="required">*</span></label><input name="state" onChange={this.onChange}  type="text" /></span>
                <span><label for='keyItem'>Zip<span className="required">*</span></label><input name="zip" onChange={this.onChange}  type="text" /></span>
                <span><label for='keyItem'>Mobile Phone <span className="required">*</span></label><input name="mphone" onChange={this.onChange}  type="text" /></span>
                <span><label for='keyItem'>Home Phone <span className="required">*</span></label><input name="hphone" onChange={this.onChange}  type="text" /></span>
                <span><label for='keyItem'>Email <span className="required">*</span></label><input name="email" onChange={this.onChange}  type="text" /></span>
                </div>
                 <span className="messageText">{this.state.inputMessage}</span>
                <div className="nextButton">
                    <button onClick={this.validation}>next step >></button>
                </div>
            </div>
    );

    }
    
}

export default ContactInformation ;