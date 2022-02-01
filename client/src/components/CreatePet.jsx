import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import {
    Link
} from "react-router-dom";

const CreatePet = (props) => {

    //state variables for each info collected from form

    let [petName, setPetName] = useState("")
    let [petType, setPetType] = useState("")
    let [petDescription, setPetDescription] = useState("")
    let [skillOne, setSkillOne] = useState("")
    let [skillTwo, setSkillTwo] = useState("")
    let [skillThree, setSkillThree] = useState("")

    let [formErrors, setFormErrors] = useState({})

    const history = useHistory();

    const createSubmitHandler = (e) => {
        e.preventDefault();
        console.log(petName, petType, petDescription, skillOne, skillTwo, skillThree)

        //put the info from form into an object
        let formInfoObj = { petName, petType, petDescription, skillOne, skillTwo, skillThree };

        axios.post("http://localhost:8000/api/pet/new", formInfoObj)
            .then(res => {
                console.log("response after posting", res)

                //if the res.data.results key is there, then form validations were valid
                //if the res.data.error key is there, then form was not filled out properly 
                if (res.data.error) { //validation errors happened
                    //res.data.error.errors contains an object that has my validation error messages for each input
                    setFormErrors(res.data.error.errors)
                } else {
                    history.push("/")
                }
            })
            .catch(err => console.log("error in submitting post request", err))

    }

    return (
        <div>
            <Link to="/" >back to home</Link>
            <form onSubmit={createSubmitHandler}>
                <div className="form-group">
                    <label htmlFor="">Pet Name: </label>
                    <input onChange={(e) => { setPetName(e.target.value) }} type="text" name="" id="" className="form-control" />
                    <p className="text-danger">{formErrors.petName?.message}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="">Pet Type: </label>
                    <input onChange={(e) => { setPetType(e.target.value) }} type="text" name="" id="" className="form-control" />
                    <p className="text-danger">{formErrors.petType?.message}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="">Pet Description: </label>
                    <input onChange={(e) => { setPetDescription(e.target.value) }} type="text" name="" id="" className="form-control" />
                    <p className="text-danger">{formErrors.petDescription?.message}</p>
                </div>
                <p>Skills Optional</p>
                <div className="form-group">
                    <label htmlFor="">Skill 1: </label>
                    <input onChange={(e) => { setSkillOne(e.target.value) }} type="text" name="" id="" className="form-control" />
                    <p className="text-danger">{formErrors.skillOne?.message}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="">Skill 2: </label>
                    <input onChange={(e) => { setSkillTwo(e.target.value) }} type="text" name="" id="" className="form-control" />
                    <p className="text-danger">{formErrors.skillTwo?.message}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="">Skill 3: </label>
                    <input onChange={(e) => { setSkillThree(e.target.value) }} type="text" name="" id="" className="form-control" />
                    <p className="text-danger">{formErrors.skillThree?.message}</p>
                </div>


                <input type="submit" value="Add Pet" className="btn btn-success mt-3" />


            </form>
        </div>
    );
};

export default CreatePet;