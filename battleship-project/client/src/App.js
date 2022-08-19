import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch("/members").then(
      res => res.json()
    ).then(
      data => {
        setData(data);
        console.log(data);
      }
    )
  }, [])

  return (
    <div>
      <h1>{ data && data.members.map(member => {
        return <li>{ member }</li>
      })}</h1>
    </div>
  );
}

export default App;
