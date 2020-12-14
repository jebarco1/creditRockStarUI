import React, { Component,useState } from 'react';
import {sendData} from '../services/sendData';

import BasicInformation from './Client/basicInformation';
import ContactInformation from './Client/ContactInformation';
import IdInformation from './Client/IdInformation';
import QInformation from './Client/QInformation';

class OrderAdd extends Component {


    state = {
            reportStartDate: '',
            visible: true, 
            basicShow : true, 
            contactShow : true, 
            idShow : true, 
            table : 'client'
           };
    
    
    getData = () => {
         console.log('getdata');

    }
    
    
   actionAdd = (type,payload) => {
         
         let newPayload = this.state;                                               
         newPayload[type] = payload;
   
         this.setState({[type+'Show'] : true});
         
         if(type =='Q')
         {
             payload = {};
             payload['user'] = this.state.basic;
             payload['userAddress'] = this.state.contact;
             payload['id'] = this.state.id;
             payload['createState'] = this.state.reportStartData;
             
             console.log(payload);
             
            sendData(this.state.table, 'POST' , payload).then ((result) => {this.getData();}); 
            console.log(JSON.stringify(payload));
         }
         
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
                <span className="checkBox"><input name="spanish" type="checkbox" /><label for='keyItem' >SPANISH is your preferred language to communicate? <span className="required">*</span></label></span>
                <span><label for='keyItem'>Intake Date <span className="required">*</span></label><input type="text" value={this.state.reportStartDate} disabled/></span>
                {this.state.visible ?  <BasicInformation  action={this.actionAdd} /> : null }
                {this.state.basicShow ?  <ContactInformation action={this.actionAdd} />  : null }
                {this.state.contactShow ?  <IdInformation  action={this.actionAdd}/>  : null }
                {this.state.idShow ?  <QInformation   action={this.actionAdd} />   : null }
             </div>
         );

    }
    
}

export default OrderAdd;