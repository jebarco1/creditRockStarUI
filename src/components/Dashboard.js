import React, { Component } from 'react';
import {NavLink, Route, Switch, BrowserRouter } from 'react-router-dom';
import Orders from './Orders';
import Keys from './Keys';
import Vehicles from './Vehicles';
import Technician from './Technician';
import Welcome from './Welcome';
import ClientAdd2 from './ClientAdd2';
import Clients from './Clients';

class Dashboard extends Component {
    
    render() {
        
        let links = [
 
            { label: 'Add Client' , link : '/addClient' },
            { label: 'Clients' , link : '/Clients' },
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
                            <Route exact path="/keys" component={Keys} /> 
                            <Route exact  path="/vehicles" component={Vehicles} /> 
                            <Route exact path="/technician" component={Technician} /> 
                            <Route exact path="/addClient" component={ClientAdd2} />
                            <Route exact path="/clients" component={Clients} />
                            </Switch>
                    </BrowserRouter>
                </div>
                );
    }
    
}

export default Dashboard;