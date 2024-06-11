import React, { useState, useEffect } from 'react';


const DogContext = React.createContext();

 
const Provider = ({ children }) => {
    
    const [dogList, setDogList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [ formSubmitted, setFormSubmitted ] = useState(false);
    const [ userData, setUserData ] = useState("");
    const [filteredList, setFilteredList] = useState([]);
    const [currentBreed, setCurrentBreed] = useState("");
    const [adoptTrigger, setAdoptTrigger] = useState(false);
    
    
    useEffect(() => {
        //Get request for dogs
        fetch("/dogs")
        .then(r => {
            if(r.ok){
                r.json()
                .then(dogs => {
                    setDogList(dogs)
                    console.log("ran")
                })
            } else {
                console.log(r)
            }
        })
    },[])

    useEffect(() => {
        //Get request for dogs
        fetch("/dogs")
        .then(r => {
            if(r.ok){
                r.json()
                .then(dogs => {
                    setDogList(dogs)
                    console.log("ran")
                })
            } else {
                console.log(r)
            }
        })
    },[adoptTrigger])

    //Figure out how to get shared state can't put [dogList]
    useEffect(() => {

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
    }, []);

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
            filteredList,
            setFilteredList,
            currentBreed,
            setCurrentBreed,
            adoptTrigger,
            setAdoptTrigger
        } }    
    >
        { children }
    </DogContext.Provider>
  );
};

export { Provider, DogContext};