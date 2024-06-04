import React, { useState, useContext } from "react";
import { DogContext } from "./AppContext";
import { useFormik } from "formik";
import { formSchema } from "../formSchema";

function DogForm(){

    const formik = useFormik({
        initialValues: {
            name: "",
            breed: "",
            image: "",
            price: "",
            age: "",
            description: ""
        },
        validationSchema: formSchema,
        onSubmit: values => {
            console.log(values);
        }
    });

    return(
        <div className="dog-form">
            <h1>Dog Details</h1>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label>Dog Name:</label>
                    <input 
                        placeholder="Enter your dog's name"
                        type='text' 
                        name='name' 
                        value={formik.values.name}
                        onChange={formik.handleChange}
                    />
                    <p className="form-error"> {formik.errors.name}</p>
                </div>
                <div className="form-group">
                    <label>Dog Breed:</label>
                    <input 
                        placeholder="Enter your dog's breed"
                        type='text' 
                        name='breed'
                        value={formik.values.breed}
                        onChange={formik.handleChange} 
                    />
                </div>
                <div className="form-group">
                    <label>Image:</label>
                    <input 
                        placeholder="Input a picture of your dog"
                        type='text' 
                        name='image' 
                        value={formik.values.image}
                        onChange={formik.handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Price:</label>
                    <input 
                        placeholder="Enter a price for your dog"
                        type='number' 
                        name='price' 
                        value={formik.values.price}
                        onChange={formik.handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Age:</label>
                    <input 
                        placeholder="Enter your dog's age"
                        type='number' 
                        name='age' 
                        value={formik.values.age}
                        onChange={formik.handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <input 
                        placeholder="Enter a description of your dog"
                        type='text' 
                        name='description' 
                        value={formik.values.description}
                        onChange={formik.handleChange}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default DogForm;