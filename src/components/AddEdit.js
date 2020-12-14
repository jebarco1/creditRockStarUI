import React, { Component } from 'react';

class AddEdit extends Component {


    constructor() {
        super();
        this.state = {
            inputMessage : '',
            typeSubmit : '',
            id : ''
           };
    }
      
    onChange = (e) => {
     
        this.setState({ [e.target.name]: e.target.value });

      }
      

    handleChange = () => {
        
        let result = true;
        let payload = {};
        
        this.props.columns.map((column) => {
            if(column.key !== 'action')
            { 
                if(!this.state[column.key])
                {
                   result = false;
                } else {
                    payload[column.key] = this.state[column.key];
                }
            }
        });

        
        if(result)
        {   
          this.props.action(payload);    
            
        } else {
            
            this.setState({inputMessage : 'All fields required!'});
        }
       
    }
    
    
    componentDidMount(){
        //Get this.props
  

      };

   
    
    render() {
        
        let typeOf = 'Create';
        if(this.props.inputData)
        {
            typeOf = 'Update';
        }
        
        
        let inputMarkup = this.props.columns.map((input) =>
        {
            
            if(input.key !== 'action')
            {    
                if(typeOf == 'Create')
                {
                    return (<span><label for={input.key}>{input.name}:</label><input type="text" name={input.key}  onChange={this.onChange} /></span>);
                
                } else {

                    return (<span><label for={input.key}>{input.name}:</label><input type="text" name={input.key} value={this.props.inputData[input.key]} onChange={this.onChange} /></span>);
                }
            } else {
                return false;
            }
        });
        
       
        return (
        <div className="AddDataContainer">
            {inputMarkup}
            <button onClick={this.handleChange}>Create</button>
            <div className="inputMessage">{this.state.inputMessage}</div>
        </div>
          );
                
    }
    
}

export default AddEdit;