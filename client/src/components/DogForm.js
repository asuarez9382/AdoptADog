import React from "react";

function DogForm(){

    return(
        <div className="dog-form">
            <h1>Dog Details</h1>
            <form>
                <div className="form-group">
                    <label>Dog Name:</label>
                    <input type='text' name='name' />
                </div>
                <div className="form-group">
                    <label>Dog Breed:</label>
                    <input type='text' name='breed' />
                </div>
                <div className="form-group">
                    <label>Price:</label>
                    <input type='number' name='price' />
                </div>
                <div className="form-group">
                    <label>Age:</label>
                    <input type='number' name='age' />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <input type='text' name='description' />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>

    );
}

export default DogForm;