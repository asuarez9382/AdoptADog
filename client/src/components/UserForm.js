import React from "react";

function UserForm() {
    return(
        <div className="signup-form">
            <h1>Sign up</h1>
            <form>
                <div className="form-group">
                    <label>Username</label>
                    <input 
                        type="text"
                        name="username"
                        placeholder="Enter username"
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input 
                        type="text"
                        name="email"
                        placeholder="Enter a valid email"
                    />
                </div>
                <div className="form-group">
                    <label>Create a Password</label>
                    <input 
                        type="password"
                        name="password"
                        placeholder="Enter password"
                    />
                </div>
                <div className="form-group">
                    <label>Confirm Password</label>
                    <input 
                        type="password"
                        name="password-confirmation"
                        placeholder="Confirm Password"
                    />
                </div>
            </form>
        </div>
    );
}

export default UserForm;