import { createContext, useState } from "react";

export let ConterContext = createContext(0);

 export default function ConterContextProvider(props) {



    const [conter, setCounter] = useState(0);
    const [conter2, setCounter2] = useState(0);
    return <ConterContext.Provider value={{ conter, conter2 }}>
            {props.children}
    </ConterContext.Provider>
    
}