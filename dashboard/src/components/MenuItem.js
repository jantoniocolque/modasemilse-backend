import React from 'react';

function MenuItem(proper){
    const activo = "nav-item " + proper.active;
    const colapsado = "nav-link " + proper.collapsed;
    const type = proper.type;
    let estiloSpan = ""
    if(type === "notification"){
        estiloSpan = "badge badge-danger badge-counter"
    }
    return(
        <li className={activo}>
			<a className={colapsado} href="/">
				<i className={proper.icon}></i>
				<span className={estiloSpan}>{proper.name}</span>
			</a>
		</li>
    )
}

export default MenuItem;