import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';
import {sendData} from '../services/sendData';
import Actions from './Actions';
import OrderAdd from './OrderAdd';
import { Button , Form, FormGroup, Label, Input } from 'reactstrap';

class Orders extends Component {
    
    constructor() {
        super();
        this.state = {
            
            payload: [],
        table: 'order',
        showAddComponent : false
           };
    }

    componentWillMount()
    {
           sendData(this.state.table, 'GET' , this.state).then ((result) => {
           let responseJSON = result;
           if(responseJSON.result && responseJSON.result.length) {    
                    let resultAddAction =  responseJSON.result.map(obj=> ({ ...obj, action: <Actions data={obj} actionDelete={this.actionDelete} element={obj.id}/> }))
                    this.setState({payload : resultAddAction});
            } 
        }); 

    }
    
    showAddComponent = () => {
        this.setState({showAddComponent : true});
    }
    actionAdd = (payload) => {
        
        this.setState({showAddComponent : false});
  
          sendData(this.state.table, 'POST' , payload).then ((result) => {
             this.getData();
         }); 
    }
    
    getData = () => {
        
         sendData(this.state.table, 'GET' , this.state).then ((result) => {
           let responseJSON = result;
           if(responseJSON.result && responseJSON.result.length) {    
                    let resultAddAction =  responseJSON.result.map(obj=> ({ ...obj, action: <Actions data={obj} actionDelete={this.actionDelete} element={obj.id}/> }))
                    this.setState({payload : resultAddAction});
            } 
        }); 
    }
    
       actionDelete = (i) => {
        
         sendData(this.state.table, 'DELETE' , {id : i}).then ((result) => {
             this.getData();
         }); 
    }
    
    
    render() {
        const columns = [
        { key: 'id', name: 'Order Number' , type : ''},
        { key: 'item_name', name: 'Item Name' , type : 'select' },
        { key: 'vehicleName', name: 'Vehicle' , type : 'select'},
        { key: 'price', name: 'Price' , type : 'select'},
        { key: 'technician', name: 'Techician' , type : 'select'},
        { key: 'action', name: 'Action' , type : ''},];
           const payload = this.state.payload;
        const table = this.state.table;
        
       
 
        return ( <div>
                <div class="createButton"><Button onClick={this.showAddComponent} className="btn-lg btn-dark btn-block">Create</Button></div> 
                <div style={this.state.showAddComponent ? {} : { display: 'none' }}>
                <OrderAdd action={this.actionAdd} table={table} columns={columns}/>  
                </div>
                <div id="gridRow">
                <ReactDataGrid
                columns={columns}
                rowGetter={i => payload[i]}
                rowsCount={payload.length}
                minHeight={350} /></div>
                        </div>
                )
                
    }
    
}

export default Orders;