import React from 'react';

function CardIndividual(props){
    const colorBordeLeft = "card "+props.bordeColor+" shadow h-100 py-2";
    const colorTitle = "text-xs font-weight-bold "+ props.titleColor + " text-uppercase mb-1";
    const title = props.title;
    const dato = props.dato;
    const icon = "fas " + props.icon +" fa-2x text-gray-300";
    return (
        <div className={colorBordeLeft}>
            <div className="card-body">
                <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                        <div className={colorTitle}> {title} </div>
                        <div className="h5 mb- font-weight-bold text-gray-800">{dato}</div>
                    </div>
                    <div className="col-auto">
                        <i className={icon}></i>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default CardIndividual;