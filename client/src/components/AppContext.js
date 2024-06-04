import React, { useState, useEffect } from 'react';


const DogContext = React.createContext();

 
const Provider = ({ children }) => {
    
    const [dogList, setDogList] = useState([]);
    

    useEffect(() => {
        fetch("/dogs")
        .then(r => {
            if(r.ok){
                r.json()
                .then(dogs => {
                    setDogList(dogs)
                })
            } else {
                console.log(r)
            }
        })
    },[]);

  return (
    <DogContext.Provider
        value={ { dogList, setDogList} }    
    >
        { children }
    </DogContext.Provider>
  );
};

export { Provider, DogContext};