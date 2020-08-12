import React from 'react';
//import Jwt from 'jsonwebtoken';
import CardIndividual from'./CardIndividual'
import Lastest from './Lastest'
import Categories from './Categories'
import usersResource from '../requests/usersResource'

function Dashboard(){

	usersResource.login().then(function(results){
		console.log(results);
	});

    return(
        <div className="container-fluid">
				<div className="d-sm-flex align-items-center justify-content-between mb-4">
					<h1 className="h3 mb-0 text-gray-800">Resumen:</h1>
				</div>

				<div className="row">
                    <div className="col-md-4 mb-4">
                        <CardIndividual bordeColor="border-left-primary" titleColor="text-primary" title="Productos:" dato="135" icon="fas fa-box-open"/>
                    </div>
                    <div className="col-md-4 mb-4">
                        <CardIndividual bordeColor="border-left-success" titleColor="text-success" title="Usuarios:" dato="56" icon="fas fa-users"/>
					</div>
                    <div className="col-md-4 mb-4">
                        <CardIndividual bordeColor="border-left-warning" titleColor="text-warning" title="Categorias:" dato="5" icon="fas fa-bookmark"/>
					</div>
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