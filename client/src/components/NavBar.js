import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav>
            <div className="nav-left">
                <Link
                    to="/"
                    className="nav-link"
                >
                    AdoptADog
                </Link>
                <Link
                    to="/dogs"
                    className="nav-link"
                >
                    Available Dogs
                </Link>
                <Link
                    to="/listdog"
                    className="nav-link"
                >
                    List a Dog for Adoption
                </Link>
                <Link
                    to="/about"
                    className="nav-link"
                >
                    About
                </Link>
            </div>
            <div className="nav-right">
                <Link
                    to="/login"
                    className="nav-link"
                >
                    Login
                </Link>
                <Link
                    to="/signup"
                    className="nav-link"
                >
                    Signup
                </Link>
            </div>
        </nav>
    );
}

export default NavBar;