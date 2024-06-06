import React, { useState, useEffect } from 'react';


const DogContext = React.createContext();

 
const Provider = ({ children }) => {
    
    const [dogList, setDogList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [ formSubmitted, setFormSubmitted ] = useState(false);
    const [ userData, setUserData ] = useState("")
    

    useEffect(() => {

        //Get request for dogs
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

        //Get request for users
        fetch("/users")
        .then(r => {
            if(r.ok){
                r.json()
                .then(users => {
                    setUserList(users)
                })
            } else {
                console.log(r)
            }
        })
    },[]);

    useEffect(() => {
        // auto-login
        fetch("/check_session").then((r) => {
          if (r.ok) {
            r.json().then((data) => setUserData(data));
          }
        });
      }, []);

  return (
    <DogContext.Provider
        value={ { 
            dogList, 
            setDogList, 
            userList, 
            setUserList,
            formSubmitted, 
            setFormSubmitted,
            userData,
            setUserData,
        } }    
    >
        { children }
    </DogContext.Provider>
  );
};

export { Provider, DogContext};