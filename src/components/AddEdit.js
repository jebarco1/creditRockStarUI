import React, { Component } from 'react';

class AddEdit extends Component {


    constructor() {
        super();
        this.state = {
           };
    }
      
    onChange = (e) => {
     
        this.setState({ [e.target.name]: e.target.value });

      }
      
    handleChange = () => {
        this.props.action(this.state);          
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
        </div>
          );
                
    }
    
}

export default AddEdit;