import React from "react";

function LoginForm(){

    return(
        <div className="login-container">
            <h1>Login</h1>
            <form className="login-form"> 
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        className="form-input" 
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password" 
                        name="password"
                        className="form-input"
                    />
                </div>
                <button type="submit" className="form-button">Login</button> 
            </form>
        </div>

    );
}

export default LoginForm;