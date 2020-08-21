import React, {Component} from 'react';
import '../index.css'
import MenuItem from './MenuItem';
import modasLogo from '../assets/images/logo512.png';

class sideBar extends Component{
    render(){
		return(
			<ul className="navbar-nav sidebar accordion" id="accordionSidebar">
				<a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
					<div className="sidebar-brand-icon">
						<img src={modasLogo} width="60" alt='' />
					</div>
					<div className="sidebar-brand-text mx-3"> Dashboard</div>
				</a>
				<hr className="sidebar-divider"/>
				<div className="sidebar-heading">Acceder a:</div>
					<MenuItem active="" name="Productos" collapsed="collapsed" icon="fas fa-box-open" to='/products'/>
					<MenuItem active="" name="Usuarios" collapsed="" icon="fas fa-users" to='/users' />
					<MenuItem active="" name="Categorías" collapsed="collapsed" icon="fas fa-bookmark" to='/categories' />
				<hr className="sidebar-divider d-none d-md-block"/>
			</ul>
		
			)
	}
}

export default sideBar;