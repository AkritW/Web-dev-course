import React, { useState, useEffect } from 'react';

const OceanField = (props) => {
    const [className, setClassName] = useState("oceanField")
    // field: '.' or ',' or 'c' or 'C'
    // coords: {x: x, y, y}
    // callBack: function

    return (
        <div key={JSON.stringify(props.coords)} 
             className={className}
             onClick={() => { props.callBack(ocean => {
                // ocean[props.coord.y][props.coords.x] = 'something'
                // send api shoot
                // await response and return it to the callback
             }) } }>
            { props.field }
        </div>
    )
}

const Ocean = (props) => {
    const [ocean, setOcean] = useState(props.ocean);

    return (
        <div>
            { ocean && ocean.map((oceanRow, y) => {
                return (
                    oceanRow && oceanRow.map((oceanField, x) => {
                        return <OceanField coord={{x, y}} field={oceanField} callBack={setOcean}/>
                    })
                )
            }) }
        </div>
    )
}

export default Ocean;