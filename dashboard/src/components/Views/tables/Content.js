import React from 'react'

function TablaItem(props){

    const firtsValue = props.data.id
    const secondValue = props.data.name

    let thirdValue;
    if(props.data.description){
        thirdValue = props.data.description
    }else if(props.data.email){
        thirdValue = props.data.email
    }

    return(
        <tr>
            <td>{firtsValue}</td>
            <td>{secondValue}</td>
            <td>{thirdValue}</td>
        </tr>
    )
}


export default TablaItem; 