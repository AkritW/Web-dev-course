import React, { useState, useEffect } from 'react';

const BattleShip = (props) => {


    return (
        <div className="battleship">
            { 
                props.data && props.data.map(row => {
                    return (
                        <div className="battleship_row">{
                            row.map(element => {
                                return (
                                    <div className="battleship_element">{ element }</div>
                                )
                            })
                        }</div>
                    )
                })
            }
        </div>
    )
}

export default BattleShip;
