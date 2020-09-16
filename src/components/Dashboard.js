import React, { Component } from 'react';
import { Button , Form, FormGroup, Label, Input } from 'reactstrap';
import {sendData} from '../services/sendData';
import {NavLink, Route, Switch, BrowserRouter} from 'react-router-dom';
import Orders from './Orders';
import Keys from './Keys';
import Vehicles from './Vehicles';
import Technician from './Technician';

class Dashboard extends Component {
    
    render() {
        
        let links = [
            { label: 'Orders' , link : '/orders' },
            { label: 'Keys' , link : '/keys' },
            { label: 'Vehicles' , link : '/vehicles' },
            { label: 'Techicians' , link : '/technician' },
        ];
        
        let linksMarkup = links.map((link, index) =>
        {
            return (<NavLink to={link.link}>{link.label}</NavLink>);
        });

        return (<div>    
                    <BrowserRouter>
                    <div className='sideMenu'>{linksMarkup}</div>                  
                        <Switch>
                            <Route path="/orders" component={Orders} />    
                            <Route path="/keys" component={Keys} /> 
                            <Route path="/vehicles" component={Vehicles} /> 
                            <Route path="/technician" component={Technician} /> 
                        </Switch>
                    </BrowserRouter>
                </div>
                );
    }
    
}

export default Dashboard;