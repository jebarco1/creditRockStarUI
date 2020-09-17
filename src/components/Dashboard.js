import React, { Component } from 'react';
import {NavLink, Route, Switch, BrowserRouter } from 'react-router-dom';
import Orders from './Orders';
import Keys from './Keys';
import Vehicles from './Vehicles';
import Technician from './Technician';
import Welcome from './Welcome';

class Dashboard extends Component {
    
    render() {
        
        let links = [
            { label: 'Orders' , link : '/orders' },
            { label: 'Keys' , link : '/keys' },
            { label: 'Vehicles' , link : '/vehicles' },
            { label: 'Techicians' , link : '/technician' },
        ];
        
        let linksMarkup = links.map((link, key) =>
        {
            return (<NavLink to={link.link}>{link.label}</NavLink>);
        });

        return (<div>    
                    <BrowserRouter>
                    <div className='sideMenu'>{linksMarkup}</div>                  
                        <Switch>
                            <Route exact path="/" component={Welcome} />
                            <Route exact  path="/orders" component={Orders} />    
                            <Route exact path="/keys" component={Keys} t/> 
                            <Route exact  path="/vehicles" component={Vehicles} /> 
                            <Route exact path="/technician" component={Technician} /> 
                        </Switch>
                    </BrowserRouter>
                </div>
                );
    }
    
}

export default Dashboard;