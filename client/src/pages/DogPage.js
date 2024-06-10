import React, { useEffect, useState }  from "react";
import { useParams } from "react-router-dom";


function DogPage(){

    const { id } = useParams();
    const [dogInfo, setDogInfo] = useState("")
    const [adopted, setAdopted] = useState("")
   

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
            setAdopted(data.is_adopted)
            return setDogInfo(data)
        })
    }, [])

    if (!dogInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div className="dog-page-container">
            <h1 className="dog-page-title">{ adopted ? "Adopted" : `Adopt ${dogInfo['name']}`}</h1>
            <div className="dog-page-content">
                <div className="dog-page-left">
                    <div className="dog-page-image-container">
                        <img src={dogInfo['image']} alt={dogInfo['breed']} className="dog-page-image" />
                    </div>
                    <div className="dog-page-details">
                        <h3 className="dog-page-breed">{dogInfo['breed']}</h3>
                        <h3 className="dog-page-price">${dogInfo['price']}</h3>
                        <h3 className="dog-page-age">Age: {dogInfo['age']}</h3>
                    </div>
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