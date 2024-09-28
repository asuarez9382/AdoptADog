import React, { useContext, useState } from "react";
import UserForm from "../components/UserForm";
import Confirmation from "../components/Confirmation";
import { DogContext } from "../components/AppContext";


function Signup(){

    const { formSubmitted } = useContext(DogContext)

    return (
        <div>
            { formSubmitted ? <Confirmation /> : <UserForm /> }
        </div>
    );
}

export default Signup;