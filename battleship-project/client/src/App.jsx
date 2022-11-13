import React, { useEffect, useReducer } from "react";
import Landing from "./Landing";
import BattleShip from "./BattleShip";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const actions = {
  SET_PLAYER_1_READY: "SET_PLAYER_1_READY",
  SET_PLAYER_2_READY: "SET_PLAYER_2_READY",
  INIT_PLAYERS_BOARD: "INIT_PLAYERS_BOARD",
  SET_PLAYER_1_BOARD: "SET_PLAYER_1_BOARD",
  SET_PLAYER_2_BOARD: "SET_PLAYER_2_BOARD",
};

function App() {
  const fetchAPI = async () => {
    const player1Promise = fetch("/api/player1");
    const player2Promise = fetch("/api/player2");
    const res = await Promise.all([player1Promise, player2Promise]);
    const resData = await Promise.all(
      res.map((r) => {
        return r.json();
      })
    );

    return resData;
  };

  const initialState = {
    player1board: null,
    player2board: null,
    player1ready: false,
    player2ready: false,
    turn: 0,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case actions.INIT_PLAYERS_BOARD:
        return {
          ...state,
          player1board: action.payload[0].board,
          player2board: action.payload[1].board,
        };
      case actions.SET_PLAYER_1_BOARD:
        return { ...state, player1board: action.payload.board };
      case actions.SET_PLAYER_2_BOARD:
        return { ...state, player2board: action.payload.board };
      case actions.SET_PLAYER_1_READY:
        return { ...state, player1ready: action.payload };
      case actions.SET_PLAYER_2_READY:
        return { ...state, player2ready: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchAPI().then((resData) => {
      dispatch({ type: actions.INIT_PLAYERS_BOARD, payload: resData });
    });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/player1"
          element={
            <BattleShip player={1} gameState={state} gameDispatch={dispatch} />
          }
        />
        <Route
          path="/player2"
          element={
            <BattleShip player={2} gameState={state} gameDispatch={dispatch} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
