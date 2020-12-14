import React, { Component,useState } from 'react';
import DatePicker from "react-datepicker";
import ImageUploader from 'react-images-upload';
 


class IdInformation extends Component {

    constructor(props) {
        super(props);
         this.state = {
            type : 'id',
            inputMessage : '',
            pictures: [],
            idtext: 'Choose images',
            imageDisplay : ''
           };
         this.onDrop = this.onDrop.bind(this);
    }
     
    
    onDrop(picture) {
        console.log(picture[0].name);
        let imageHtml = '<img src="'+picture[0].name+'"/>';
        this.setState({pictures: picture});
        this.setState({imageDisplay: imageHtml});

    }
    
    onChange = (e) => {
        this.setState({[e.target.name] : e.target.value});
     }
     
    validation = () => {
         
         let fields = ['maidenName',  'ssn'];
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
     
    
    
    range = (start, end) => { 
        var returnAr = [];
        for (var i = start; i <= end; i++) {
            returnAr.push(i);
        }
        return returnAr;
    }
      
  
    
   render() {
       console.log(this.state.hasOwnProperty('pictures'));
        const StartYear = 1950;
        const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        const years = this.range(StartYear, new Date().getFullYear());
        const days = this.range(1, 31);

         return (
      
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
                <label for='keyItem'><input type='radio' value='1' name='rad' class='radio' /> US Federal Passport</label>
                <label for='keyItem'><input type='radio' value='2' name='rad' class='radio' /> Alien Registration (Green) Card</label>
                <label for='keyItem'><input type='radio' value='1' name='rad' class='radio' /> State Department of Motor Vehicle Issued</label>
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
                <div className="nextButton">
                    <button onClick={this.validation}>next step >></button>
                </div>
            </div>
        );

    }
    
}

export default IdInformation ;