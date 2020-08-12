import React from 'react'
import Category from './Category'

function Categories(){
    return(
        <div className="card shadow mb-4">
            <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Categorías registradas</h6>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-lg-6 mb-4">
                        <Category bgcolor="bg-info" txtcolor="text-white" text="Categoría 01" />
                    </div>
                    <div className="col-lg-6 mb-4">
                         <Category bgcolor="bg-info" txtcolor="text-white" text="Categoría 02" />
                    </div>
                    <div className="col-lg-6 mb-4">
                          <Category bgcolor="bg-info" txtcolor="text-white" text="Categoría 03" />
                    </div>
                    <div className="col-lg-6 mb-4">
                         <Category bgcolor="bg-info" txtcolor="text-white" text="Categoría 04" />
                    </div>
                    <div className="col-lg-6 mb-4">
                        <Category bgcolor="bg-info" txtcolor="text-white" text="Categoría 05" />
                    </div>
                    <div className="col-lg-6 mb-4">
                        <Category bgcolor="bg-info" txtcolor="text-white" text="Categoría 06" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Categories;