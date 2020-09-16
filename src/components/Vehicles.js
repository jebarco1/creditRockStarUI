import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';
import {sendData} from '../services/sendData';
import Actions from './Actions';
import AddEdit from './AddEdit';

class Vehicles extends Component {

    constructor(props) {
        super(props)

      
        // Set some state
        this.state = {
            payload: [],
            table: 'vehicle',
        };
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
        let columns = [
        { key: 'year', name: 'Year' },
        { key: 'make', name: 'Make' },
        { key: 'model', name: 'Model' },
        { key: 'VIN', name: 'VIN' },
        { key: 'action', name: 'Action' },];
        const payload = this.state.payload;
        const table = this.state.table;
        
        return (
                <div>
                <AddEdit action={this.actionAdd} table={table} columns={columns}/>    
                <div className="gridView">
                <ReactDataGrid
                columns={columns}
                rowGetter={i => payload[i]}
                rowsCount={payload.length}
                minHeight={350} /></div>
                   
                </div>
              )
                
    }
    
}

export default Vehicles;