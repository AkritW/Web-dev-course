import React, { useState, useEffect } from 'react';
import Landing from './Landing';
import BattleShip from './BattleShip';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


function App() {
  const [data, setData] = useState()
  const [gameStatus, setGameStatus] = useState({ player1ready: false, player2ready: false, turn: 1 })
  // const [data2, setData2] = useState()

  useEffect(() => {
    const fetchAPI = async () => {
      const player1Promise = fetch("/api/player1")
      const player2Promise = fetch("/api/player2")
      const res = await Promise.all([player1Promise, player2Promise])
      const resData = await Promise.all(res.map(r => {
        return r.json()
      }))

      setData(resData)
    }
    fetchAPI()
  }, [])

  useEffect(() => {
    data && console.log(data)
  }, [data])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/player1" element={
          <BattleShip player={1} 
                      data1={data && data[0].board} 
                      data2={data && data[1].board} 
                      setData={setData}
                      gameStatus={gameStatus}
                      setGameStatus={setGameStatus} />
        } />
        <Route path="/player2" element={
          <BattleShip player={2} 
                      data1={data && data[0].board} 
                      data2={data && data[1].board} 
                      setData={setData}
                      gameStatus={gameStatus}
                      setGameStatus={setGameStatus} />
        } />
      </Routes>
    </Router>
  );
}

export default App;