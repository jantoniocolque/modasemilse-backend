import React from 'react'
import Header from './Header';
import Content from './Content';
function Table(props){

    const productsArray = Object.values(props.arrayInfo)

    return(
            <div>
                <div className="card shadow mb-4">
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                <Header mainField='ID' secondField='Nombre' thirdField='E-mail'/>
                                <tbody>
                                    { productsArray.map((item,i)=> <Content key={i} data={item} /> )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
			</div>
    )
}

export default Table;