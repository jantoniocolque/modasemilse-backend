import React from 'react';
import Lastest from './Lastest'
import Categories from './Categories'
import AllUsers from './AllUsers';
import AllProducts from './AllProducts';
import AllCategories from './AllCategories';

function Dashboard(){
    return(
        <div className="container-fluid">
				
				<div className="d-sm-flex align-items-center justify-content-between mb-4">
					<h1 className="h3 mb-0 text-gray-800">Resumen:</h1>
				</div>
				<div className="row">
					<AllProducts />
					<AllUsers />
					<AllCategories />
				</div>

				<div className="row">
					<div className="col-lg-4 mb-4">
						<Lastest title='Ultimo producto registrado' detail='producto'/>
						<Lastest title='Ultimo usuario registrado' detail='usuario'/>
					</div>
					<div className="col-lg-8 mb-4">						
						<Categories />
					</div>
					{/*
					import Tabla from './Tabla'
					<div className="col-lg-8 mb-4">						
						<Tabla />
					</div>*/}
				</div>
		</div>
	)
}

export default Dashboard;