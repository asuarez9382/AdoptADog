import React, { useState } from "react";



function DogForm(){

    const [formData, setFormData] = useState({
        name: '',
        breed: '',
        price: '',
        age: '',
        description: ''
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
        console.log(formData)

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