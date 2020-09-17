import React, { Component } from 'react';

class AddEdit extends Component {


    constructor() {
        super();
        this.state = {
            inputMessage : ''
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
    
    componentWillMount()
    {
          this.setState(this.props.data);
    }
    

 
    render() {
        
        if(this.props.data){
            console.log(this.props.data);
        }
        
        let inputMarkup = this.props.columns.map((input) =>
        {
           
            if(input.key !== 'action')
            {    
   
                return (<span><label for={input.key}>{input.name}:</label><input type="text" name={input.key}  onChange={this.onChange} /></span>);
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