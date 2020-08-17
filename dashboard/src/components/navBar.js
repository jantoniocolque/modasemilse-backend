import React, {Component} from 'react';

class navBar extends Component{

	logout(){
		localStorage.clear();		
	}
	render(){
		return(
			// topbar
			<nav className="navbar navbar-expand topbar mb-4 static-top shadow">
				<ul className="navbar-nav ml-auto">
					<li className="nav-item d-sm-block">
						<a className="logout nav-link" href= "/" onClick={()=>{this.logout()}}>Cerrar Sesion</a>
					</li>
					<div className="topbar-divider d-none d-sm-block"></div>
					<li className="nav-item dropdown no-arrow">
					<a className="nav-link dropdown-toggle" href="/" id="userDropdown">
						<span className="mr-2 d-none d-lg-inline small">ir a ModasEmilse.com</span>
						<i className="fas fa-arrow-circle-right"></i>
					</a>
					</li>
				</ul>
			</nav>
		)	
	}
}
	
export default navBar;