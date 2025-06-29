import React, { useState, useEffect } from 'react';
import React, from 'react';
import React, {useState},{useEffect} from 'react'; 

export default function Counter(){
    const [count, setCount] = useState(0);
    const increment = () => {
        setCount(count + 1);

    }
};
return(
    <div>
        <h1>Count: {count}</h1>
        <button onClick={increment}>Increment</button>
    </div>
)
