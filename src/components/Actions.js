import React, { Component } from 'react';

class Actions extends Component {

    handleDelete = () => {
        this.props.actionDelete(this.props.element);          
    }
    
    handleUpdate = () => {
        
        this.props.actionUpdate(this.props.data);          
    }
 
   
    render() {
       
        return (
                <div>
                    <button className="actionDelete actionButton btn-sm btn-dark btn btn-secondary" onClick={this.handleDelete} >delete</button>
                    
                </div>
          )
                
    }
    
}

export default Actions;