import React from 'react'

function Category(props){
    const clase = "card " + props.bgcolor + " " +props.txtcolor + " shadow";
    const texto = props.text;
    return (
        <div className={clase}>
            <div className="card-body">
                {texto}
            </div>
        </div>
    )
}

export default Category;