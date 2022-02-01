import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import {
    Link
} from "react-router-dom";

const ViewOnePet = () => {
    const { id } = useParams();

    const history = useHistory();//to redirect after deleting a pet

    const [petDetails, setPetDetails] = useState({
        petName: "",
        petType: "",
        petDescription: "",
        skillOne: "",
        skillTwo: "",
        skillThree: "",
    })

    useEffect(() => {
        axios.get(`http://localhost:8000/api/pet/${id}`)
            .then(res => {
                console.log("response when making request for one pet", res)
                //save res.data.results into state
                setPetDetails(res.data.result)
            })
            .catch(err => console.log(err))
    }, [id])

    const deletePet = () => {
        console.log("deleting!!!")
        axios.delete(`http://localhost:8000/api/pet/delete/${id}`)
            .then(res => {
                console.log("response when deleting", res)
                history.push("/")
            })
            .catch(err => console.log(err))
    }


    return (

        <div>
            <Link to="/" >back to home</Link>
            <button onClick={deletePet} className="btn btn-danger">Adopt {petDetails.petName}</button>
            <h4>Details about {petDetails.petName}</h4>
            <p>Pet Type: {petDetails.petType}</p>
            <p>Description {petDetails.petDescription}</p>
            <p>Skills: {petDetails.skillOne} {petDetails.skillTwo} {petDetails.skillThree}</p>

        </div>
    );
};


export default ViewOnePet;