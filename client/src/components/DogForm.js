import React, { useState, useContext } from "react";
import { DogContext } from "./AppContext";



function DogForm(){

    const { dogList, setDogList } = useContext(DogContext);

    const [formData, setFormData] = useState({
        name: '',
        breed: '',
        price: '',
        age: '',
        description: '',
        image: ''
        })

    function handleChange(e){
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]:value
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        
        const { name, breed, price, age, description, image } = formData

            fetch('/dogs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    breed: breed,
                    price: parseInt(price),
                    age: age,
                    description: description,
                    image: image,
                }),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('New dog data:', data);
                return setDogList([...dogList, data])
    
            })
            .catch(error => {
                console.error('Error adding new dog:', error);
            });
    }
    

    return(
        <div className="dog-form">
            <h1>Dog Details</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Dog Name:</label>
                    <input type='text' name='name' value={formData.name} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label>Dog Breed:</label>
                    <input type='text' name='breed' value={formData.breed} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label>Image:</label>
                    <input type='text' name='image' value={formData.image} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label>Price:</label>
                    <input type='number' name='price' value={formData.price} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label>Age:</label>
                    <input type='number' name='age' value={formData.age} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <input type='text' name='description' value={formData.description} onChange={handleChange}/>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>

    );
}

export default DogForm;