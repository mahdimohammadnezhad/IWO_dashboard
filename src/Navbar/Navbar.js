import React, { Component } from 'react';
import { MenuItems } from './MenuItems';
import './Navbar.css'
import logo from './bylogo.svg';

class Navbar extends Component{
    render(){
        return(
            <nav className="NavbarItems">
                <div className="navbar-logo"><img src={logo} width="100" height="50" />  </div>
                <div className="head"><b>IMT-Desert:</b> An Irrigation Management Tool for Southern California Desert Region</div>
                <div className="nav-menu">
                    {MenuItems.map((item, index) => {
                        return(
                            <li key={index}>
                                <a className={item.cName} href={item.url}>
                                {item.title}
                                </a>
                            </li>
                        )
                    })}
                </div>
                
            </nav>
        )
    }
}

export default Navbar