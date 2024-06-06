import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DogContext } from "./AppContext";

function NavBar() {
  const { userData, setUserData } = useContext(DogContext);
  const navigate = useNavigate();
  

  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUserData("");
        navigate("/login");
      }
    });
  }

  

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="nav-link">
          AdoptADog
        </Link>
        <Link to="/dogs" className="nav-link">
          Available Dogs
        </Link>
        <Link to="/listdog" className="nav-link">
          List a Dog for Adoption
        </Link>
        <Link to="/about" className="nav-link">
          About
        </Link>
      </div>
      <div className="nav-right">
        {userData ? (
          <>
            <div>
                <Link to={`/users/${userData.id}`} className="nav-link">
                    {userData.username}
                </Link>
                <button className="logout-button" onClick={handleLogoutClick}>
                    Logout
                </button>
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/signup" className="nav-link">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;

