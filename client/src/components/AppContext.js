import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom"



const DogContext = React.createContext();

 
const Provider = ({ children }) => {
    
    const [dogList, setDogList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [ formSubmitted, setFormSubmitted ] = useState(false);
    const [userData, setUserData] = useState("");
    const [filteredList, setFilteredList] = useState([]);
    const [currentBreed, setCurrentBreed] = useState("");
    const [adoptTrigger, setAdoptTrigger] = useState(false);
    const [showLogOn, setShowLogOn] = useState(false);
    const [showLikedMessage, setShowLikedMessage] = useState(false);
    
    const location = useLocation();
    
    
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
    },[]);

    useEffect(() => {
        // auto-login
        fetch("/check_session").then((r) => {
          if (r.ok) {
            r.json().then((data) => {
                console.log(data)
                setUserData(data)
            });
          }
        });
      }, [location.pathname]);

    function handleLoggedOffClick(e) {
        setShowLogOn(true)
    }

    function handleLikedLoggedOffClick(e) {
        setShowLikedMessage(true)
    }


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
            setAdoptTrigger,
            showLogOn,
            setShowLogOn,
            handleLoggedOffClick,
            showLikedMessage, 
            setShowLikedMessage,
            handleLikedLoggedOffClick
        } }    
    >
        { children }
    </DogContext.Provider>
  );
};

export { Provider, DogContext};