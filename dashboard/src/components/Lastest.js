import React from 'react';

function Lastest(props){
    return(
        <div className="card shadow mb-4">
            <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">{props.title}</h6>
            </div>
            <div className="card-body">
                <div className="text-center">
                    {/*<img className="img-fluid px-3 px-sm-4 mt-3 mb-4" alt="img-preview"/ > */}
                    <i className="far fa-clock"></i>
                </div>
            </div>
        </div>
    )
}

export default Lastest;