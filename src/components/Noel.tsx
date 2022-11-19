import React, { useEffect, useState } from 'react';
import '../assets/css/Noel.css';

const Noel = () => {
  const [guirlandeAmpoules, setGuirlandeAmpoules] = useState<number[]>([]);

  const generateNum = () => {
    let numArray = [];

    for(let i = 0; i <= 100; i++) {      
      numArray.push(i)
    }
    setGuirlandeAmpoules(numArray);
  }

  useEffect(() => {
    generateNum();
  }, [])

  return (
    <>
      <ul id="wire">
        {
          guirlandeAmpoules.map((i) => (
            <li key={i}></li>
          ))
        }
      </ul>
      <br />
    </>
  )
}

export default Noel;
