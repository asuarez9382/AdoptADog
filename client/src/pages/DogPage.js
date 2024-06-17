import React, { useContext, useEffect, useState }  from "react";
import { useParams } from "react-router-dom";
import { DogContext } from "../components/AppContext";


function DogPage(){

    const { id } = useParams();
    const [dogInfo, setDogInfo] = useState("");

    const { adoptTrigger, setAdoptTrigger, handleLoggedOffClick, showLogOn, setShowLogOn, userData } = useContext(DogContext);
    

    function handleClick(e){
        fetch(`/dogs/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            is_adopted: true,
            user_id: userData['id']
          })
        })
        .then(response => {
          if(!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json();
        })
        .then(data => {
            
            console.log('Success:', data);
            // Handle success response here
            setAdoptTrigger(status => !status)
            userData.dogs.push(data)
        })
        .catch(error => {
          console.error('Error:', error);
          // Handle error here
        });
      }
   

    useEffect(() => {
        fetch(`/dogs/${id}`)
        .then(r => {
            if(r.ok) {
                return r.json()
            }
            else{
                console.log(r)
            }
        })
        .then(data => {
            return setDogInfo(data)
        })
    }, [dogInfo])

    if (!dogInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div className="dog-page-container">
            <h1 className="dog-page-title">{ dogInfo['is_adopted'] ? "Adopted" : `Adopt ${dogInfo['name']}`}</h1>
            { showLogOn ? <h2 className="log-on-adopt-message">Log on to adopt a dog</h2> : "" }
            <div className="dog-page-content">
                <div className="dog-page-left">
                    <div className="dog-page-image-container">
                        <img src={dogInfo['image']} alt={dogInfo['breed']} className="dog-page-image" />
                    </div>
                    <div className="dog-page-details">
                        <h3 className="dog-page-breed">{dogInfo['breed']}</h3>
                        <h3 className="dog-page-price">${dogInfo['price']}</h3>
                        <h3 className="dog-page-age">Age: {dogInfo['age']}</h3>
                    </div>{
                        showLogOn ? ( "" )
                        : (
                            dogInfo['is_adopted'] ? ""
                        :
                        <button onClick={handleClick} className="adopt-btn">Adopt Me</button>
                        )
                    }
                </div>
                <div className="dog-page-description">
                    <p>
                        Meet {dogInfo['name']}, a lovable {dogInfo['breed']} with a heart full of affection and a playful spirit. {dogInfo['name']} has grown into a well-mannered and loyal companion, always ready to share a cuddle or join in on an adventure. 
                        This delightful {dogInfo['age']}-year-old pup enjoys long walks, playing fetch, and exploring new places, making them an excellent companion for an active individual or family. {dogInfo['name']} has a gentle temperament and gets along well with other pets and children, making them a perfect fit for a variety of homes. 
                        They are also very smart and have mastered basic commands, showing great potential for further training. {dogInfo['name']}'s favorite pastime is lounging in the sun and soaking up all the love and attention they can get.
                        With a striking coat and expressive eyes, {dogInfo['name']} is not only beautiful but also has a personality that will instantly warm your heart. 
                        They are up to date on all vaccinations, neutered/spayed, and fully vetted, ready to become a cherished member of their new family. 
                        If you're looking for a loyal, loving, and playful companion, {dogInfo['name']} is the perfect dog for you.
                        Come meet {dogInfo['name']} and see for yourself what a wonderful addition they will be to your home. 
                        Adopt {dogInfo['name']} today and start a lifetime of love and adventures together.
                    </p>
                </div>
            </div>
        </div>

    );
}

export default DogPage;