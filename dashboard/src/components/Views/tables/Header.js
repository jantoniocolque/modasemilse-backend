import React from 'react'

function TablaHeader(props){
    return(
        <thead>
            <tr>
                <th>{props.mainField}</th>
                <th>{props.secondField}</th>
                <th>{props.thirdField}</th>
            </tr>
        </thead>
    )
}

export default TablaHeader; 