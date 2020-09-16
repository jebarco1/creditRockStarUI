import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';
import {sendData} from '../services/sendData';
import Actions from './Actions';
import AddEdit from './AddEdit';

class Keys extends Component {

    state = {
        payload: [],
        table: 'key'
    }
    
    actionAdd = (payload) => {
  
         sendData(this.state.table, 'POST' , payload).then ((result) => {
             this.getData();
         }); 
    }
    

    
    actionDelete = (i) => {
        
         sendData(this.state.table, 'DELETE' , {id : i}).then ((result) => {
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

    componentWillMount() {this.getData();}

    render() {
        const columns = [
        { key: 'item_name', name: 'Item Name' },
        { key: 'description', name: 'Description' },
        { key: 'price', name: 'Price' },
        { key: 'action', name: 'Action' },];
        const payload = this.state.payload;
        const table = this.state.table;
 
        return ( <div>
                <AddEdit action={this.actionAdd} table={table} columns={columns}/>  
                <div className="gridView">
                <ReactDataGrid
                columns={columns}
                rowGetter={i => payload[i]}
                rowsCount={payload.length}
                minHeight={350} /></div>         
                </div>)
                
    }
    
}

export default Keys;