import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DogContext } from "./AppContext";

function NavBar() {

    const { userData, setUserData } = useContext(DogContext);
    


    return (
        <nav className="navbar">
            <div className="nav-left">
                <Link to="/" className="nav-link">AdoptADog</Link>
                <Link to="/dogs" className="nav-link">Available Dogs</Link>
                <Link to="/listdog" className="nav-link">List a Dog for Adoption</Link>
                <Link to="/about" className="nav-link">About</Link>
            </div>
            <div className="nav-right">
                {userData ? (
                    <>
                        <Link to="/logout" className="nav-link">Logout</Link>
                        <Link to={`/users/${userData.id}`} className="nav-link">{userData.username}</Link>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="nav-link">Login</Link>
                        <Link to="/signup" className="nav-link">Signup</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default NavBar;