import React, { useState } from "react";

const Counter = () => {
    const [count, setCount] = useState(0);
    return (
        <div className="counter_container">
            <button onClick = { () => setCount(0) }>Reset</button>
            <p>{count}</p> 
            <button onClick={ () => setCount(count + 1) }>Plus</button>
        </div>
    )
}
export default Counter ;