import React, { Component } from 'react';
import {sendData} from '../services/sendData';


class OrderAdd extends Component {


    state = {
            vehicle : [],
            technician : [],
            key : [],
            inputMessage : '',
           };
  
    handleChange = () => {
   
        let result = true;
        let fields = ['vehicle_id','technician_id','key_id'];
        
        fields.map((column) => {
                if(!this.state[column])
                {
                   result = false;
                } 
        });

        
        if(result)
        {   
            let payload = [
                {key_id : this.state.key_id,
                vehicle_id : this.state.vehicle_id,
                tech_id  : this.state.technician_id}
            ];
            
            this.setState();
            this.props.action(payload);       
            
        } else {
            
            this.setState({inputMessage : 'All fields required!'});
        }
        
    }
    
    
    onChange = (e) => {

        this.setState({[e.target.name] : e.target.value});

     }
      
      
    componentDidMount()
    {
        let tables = ['key', 'technician','vehicle'];
        tables.map((input) =>
        {
            sendData(input, 'GET' , {}).then ((result) => {
              let resultJSON = result.result;
              this.setState({[input] : resultJSON});
            }); 
       });  
    }
    
 
    render() {
        
    
    let keyItemNameOptions  = this.state.key.map((val, key) =>
    {
            return(<option value={val.id}>{val.item_name} [{val.price}]</option>);
    });
    
    let vehicleNameOptions  = this.state.vehicle.map((val, key) =>
    {
            return(<option value={val.id}>{val.year} {val.make} {val.model}</option>);
    });
    
    let technicianNameOptions  = this.state.technician.map((val, key) =>
    {
            return(<option value={val.id}>{val.first_name} {val.last_name}</option>);
    });
    
   
    
   return (
        <div className="AddDataContainer">
            <span><label for='keyItem'>Item Name:</label><select name='key_id' onChange={this.onChange}><option value="">Select Item..</option>{keyItemNameOptions}</select></span>
            <span><label for='keyItem'>Vehicle:</label><select name='vehicle_id' onChange={this.onChange}><option value="">Select Vehicle..</option>{vehicleNameOptions}</select></span>
            <span><label for='keyItem'>Technician:</label><select name='technician_id' onChange={this.onChange}><option value="">Select Technician..</option>{technicianNameOptions}</select></span>
             <button onClick={this.handleChange}>Create</button>
            <div className="inputMessage">{this.state.inputMessage}</div>
         </div>
    );
                
    }
    
}

export default OrderAdd;