import React, { Component,useState } from 'react';
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";
 import { registerLocale, setDefaultLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';

class BasicInformation extends Component {


    state = {
            type : 'basic',
            inputMessage : '',
           };
  
 
    onChange = (e) => {
        this.setState({[e.target.name] : e.target.value});
     }
     
     validation = () => {
         
         let fields = ['fname', 'mname', 'lname'];
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
        
    }

    render() {

            return (

                     <div className="clientSection clientInformation">
                     <h3>Client Information</h3>
                     <div className="dataInput">
                         <span><label>First Name<span className="required">*</span></label><input name="fname" onChange={this.onChange} type="text" /></span>
                         <span><label>Middle Name <span className="required">*</span></label><input name="mname"onChange={this.onChange} type="text" /></span>
                         <span><label>Last Name<span className="required">*</span></label><input name="lname" onChange={this.onChange} type="text" /></span>
                    </div>
                         <span className="messageText">{this.state.inputMessage}</span>
                        <div className="nextButton">
                            <button onClick={this.validation}>next step >></button>
                        </div>
                     </div>

             );

    }
    
}

export default BasicInformation ;