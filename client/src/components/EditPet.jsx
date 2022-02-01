
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import {
    Link
} from "react-router-dom";

const EditPet = () => {

    //get the route param info containing the id of the object we want to edit
    const { id } = useParams();

    //state variable to save the info i get back from api about one product (or one object)
    let [petInfo, setPetInfo] = useState({
        petName: "",
        petType: "",
        petDescription: "",
        skillOne: "",
        skillTwo: "",
        skillThree: "",
    })

    let [formErrors, setFormErrors] = useState({})

    useEffect(() => {
        //make an axios call to get information from the backend about one product using the api endpoint to get one product
        axios.get(`http://localhost:8000/api/pet/${id}`)
            .then(res => {
                console.log("response is this-->", res)
                setPetInfo(res.data.result)

            })
            .catch(err => console.log(err))
    }, [])

    //initialize useHistory so we can redirect after the update of the form
    const history = useHistory();

    //changehandler that will be called each time the form info is being changed
    const changeHandler = (e) => {
        console.log("changed in form detected!!")
        if (e.target.type === "checkbox") {
            setPetInfo({
                ...petInfo,
                [e.target.name]: e.target.checked
            })
        } else {
            setPetInfo({
                ...petInfo,
                [e.target.name]: e.target.value
            })

        }
    }



    const updatePetSubmitHandler = (e) => {
        console.log("testing handler")
        e.preventDefault();
        axios.put(`http://localhost:8000/api/pet/update/${id}`, petInfo)
            .then(res => {
                console.log("res after put request-->", res)
                // history.push("/")
                if (res.data.error) { //validation errors happened
                    //res.data.error.errors contains an object that has my validation error messages for each input
                    setFormErrors(res.data.error.errors)
                } else {
                    history.push("/")
                }
            })
            .catch(err => console.log(err))

    }

    return (
        <div>
            <Link to="/" >back to home</Link>
            <h4>Edit {petInfo.petName}</h4>
            <form onSubmit={updatePetSubmitHandler}>
                <div className="form-group">
                    <label htmlFor="">Pet Name:</label>
                    <input type="text" name="petName" id="" className="form-control" value={petInfo.petName} onChange={changeHandler} />
                    <p className="text-danger">{formErrors.petName?.message}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="">Pet Type:</label>
                    <input type="text" name="petType" id="" className="form-control" value={petInfo.petType} onChange={changeHandler} />
                    <p className="text-danger">{formErrors.petType?.message}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="">Pet Description:</label>
                    <input type="text" name="petDescription" id="" className="form-control" value={petInfo.petDescription} onChange={changeHandler} />
                    <p className="text-danger">{formErrors.petDescription?.message}</p>
                </div>
                <p>Skills Optional</p>
                <div className="form-group">
                    <label htmlFor="">Skill 1:</label>
                    <input type="text" name="skillOne" id="" className="form-control" value={petInfo.skillOne} onChange={changeHandler} />
                    <p className="text-danger">{formErrors.skillOne?.message}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="">Skill 2:</label>
                    <input type="text" name="skillTwo" id="" className="form-control" value={petInfo.skillTwo} onChange={changeHandler} />
                    <p className="text-danger">{formErrors.skillTwo?.message}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="">Skill 3:</label>
                    <input type="text" name="skillThree" id="" className="form-control" value={petInfo.skillThree} onChange={changeHandler} />
                    <p className="text-danger">{formErrors.skillThree?.message}</p>
                </div>

                <input type="submit" value="Edit Pet" className="btn btn-success mt-3" />
            </form>
        </div>
    );
};

export default EditPet;