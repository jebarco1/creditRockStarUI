import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';
import {sendData} from '../services/sendData';
import Actions from './Actions';
import OrderAdd from './OrderAdd';
import { Button  } from 'reactstrap';
import Preview from './Client/preview';

class Clients extends Component {
    
    constructor() {
        super();
        this.state = {
            
        payload: [],
        table: 'addClient',
            updateData : [],
            showAddComponent : false,
            user : [],
            userHtml : []
        };
    }

 
 
    
    showAddComponent = () => {
        this.setState({showAddComponent : true});
    }
    
    actionReloadReport = () => {
        
        this.getCreditReport();
        
    }
    
      actionDelete = (i) => {
        
         sendData(this.state.table, 'DELETE' , {id : i}).then ((result) => {
             this.getData();
         }); 
    }
     previewClient = (i) => {

         this.setState({user : i});
         this.getCreditReport();

    }
    
    getCreditReport = () => {
         sendData('processCreditReportTest', 'POST' , {'userId' : this.state.user.id}).then ((result) => {
           let responseJSON = result;
           this.setState({userHtml :responseJSON.html})
          
        }); 
        
    }
    
    
    getData = () => {

         sendData(this.state.table, 'GET' , this.state).then ((result) => {
           let responseJSON = result;
           if(responseJSON.result && responseJSON.result.length) {    
                    let resultAddAction =  responseJSON.result.map(obj=> ({ ...obj, action: <Actions data={obj} actionDelete={this.actionDelete} previewClient={this.previewClient} element={obj.id}/> }))
                     this.setState({payload : resultAddAction});
            } else {
                   this.setState({payload : []});
            }
        }); 
    }
    
      
    componentWillMount() {this.getData();}
    
     
    
    
    render() {
        const columns = [
        { key: 'fname', name: 'First Name' , type : ''},
        { key: 'lname', name: 'Last Name' , type : 'select' },
        { key: 'email', name: 'Email' , type : 'select'},
        { key: '', name: 'Status' , type : 'select'},
        { key: 'action', name: 'Action' , type : ''},];
        
        let payload = this.state.payload;
  
        const isUser = this.state.user;
        let preview;
        if ( isUser) {   
           preview =  <Preview action={this.actionReloadReport} userHtml={this.state.userHtml} user={this.state.user}/>;  
        } 
 
        return ( <div>
                <div id="gridRow"><ReactDataGrid columns={columns} rowGetter={i => payload[i]} rowsCount={payload.length} minHeight={450} maxWidth={1150}/></div>
            
                <div className="preview">
                    {preview}
                </div></div>
               )
                
    }
    
}

export default Clients;