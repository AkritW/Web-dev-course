import React, { useState, useEffect } from 'react';
import BattleShip from './BattleShip';
import './App.css';

function App() {
  const [data, setData] = useState()

  useEffect(() => {
    fetch("/api/player1").then(
      res => res.json()
    )
    .then(
      data => {
        setData(data.board);
      }
    )
    .catch(e => {
      console.log(e)
    })
  }, [])

  return (
    <div>
      <BattleShip data={data} callBack={setData} />
    </div>
  );
}

export default App;