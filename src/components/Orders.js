import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';
import {sendData} from '../services/sendData';
import Actions from './Actions';

class Orders extends Component {

    state = {
        payload: [],
        table: 'order'
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
    
    
    render() {
        const columns = [
        { key: 'id', name: 'Order Number' },
        { key: 'item_name', name: 'Item Name' },
        { key: 'vehicleName', name: 'Vehicle' },
        { key: 'price', name: 'Price' },
        { key: 'technician', name: 'Techician' },
        { key: 'action', name: 'Action' },];
        const payload = this.state.payload;
 
        return (<ReactDataGrid
                columns={columns}
                rowGetter={i => payload[i]}
                rowsCount={payload.length}
                minHeight={350} />)
                
    }
    
}

export default Orders;