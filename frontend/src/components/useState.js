import React, { useState } from "react";

export default function countNum(){
    const [count,incrementCount] = useState(0);
    const increment = () => {
        incrementCount(count + 1);
    };
    
}
return (
    <div>
        <h1>Count: {count}</h1>
        <button onClick={increment}></button>
    </div>
)