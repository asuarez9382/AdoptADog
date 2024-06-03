import React from "react";

function DogForm(){

    return(
        <div className="dog-form">
            <h1>Dog Form</h1>
            <form>
                <div className="form-name">
                    <label>Dog Name: </label>
                    <input type='text' name='name' />
                </div>
                <div className="form-breed">
                    <label>Dog Breed: </label>
                    <input type='text' name='breed' />
                </div>
                <div className="form-price">
                    <label>Price: </label>
                    <input type='integer' name='price' />
                </div>
                <div className="form-age">
                    <label>Age: </label>
                    <input type='integer' name='age' />
                </div>
                <div className="form-description">
                    <label>Description: </label>
                    <input type='text' name='description' />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default DogForm;