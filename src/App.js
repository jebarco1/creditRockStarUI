import React, { Component } from 'react';
import Dashboard from './components/Dashboard';
import { Button , Form, FormGroup, Label, Input } from 'reactstrap';
import {sendData} from './services/sendData';
import './App.css'; 
class App extends Component {
   

    constructor(props) {
	super(props);
        this.state= {
	  email:'',
          password:'',
          message:''
	}
       //bind functions to state
	this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.onChange = this.onChange.bind(this);

      }
      
    login(){
   
         sendData('user/login', 'POST', this.state).then ((result) => {
           let responseJSON = result;
           
           if(responseJSON.user)
           {
               this.setState(responseJSON.user);
           } else{
               
               var message = { message : 'Login Failed try again!'};
               this.setState(message);
           }
           
        });  
    }
    
    logout() 
    {
        this.setState({ 
            api_token : false,
            email: false,
            password:  false,
            timesheet: false,
            message: false
        });
        
    }
    
    onChange(e)
    {
	this.setState({[e.target.name]: e.target.value});
    }
    
  
    //life cyce component 
    render() {


    if(!this.state.api_token) {    
        return (
                <div className="contentBlock">
            <Form className="login-form">
             <h1><span className="HeaderText">Key Service Portal</span></h1>
             <FormGroup>
             <label>Email</label>
             <Input type="email" name="email" placeholder="Email" onChange={this.onChange}/>
             </FormGroup>
             <FormGroup>
               <Label>Password</Label>
               <Input type="password" name="password" placeholder="Password" onChange={this.onChange} />
             </FormGroup>
             <Button className="btn-lg btn-dark btn-block"i onClick={this.login}>log in</Button>
                     
                    <div className="messageContainer"><p>{this.state.message}</p></div>
	</Form>
        </div>
        );

     } else {
     
     
          return (
                  
          <div className="contentBlock">
          
            <div className="headerActions"> 
              <p>Welcome {this.state.name} 
              <Button className="btn-md btn-dark btn-block"i onClick={this.logout}>LOGOUT</Button>
            </p>
            </div>
               <Dashboard user={this.state.user}/>
             </div>);
 }
     
       
    }
    
}

export default App;
