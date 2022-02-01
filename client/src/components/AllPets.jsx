import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllPets = () => {
    let [allPets, setAllPets] = useState([]);
    let [deleted, setDeleted] = useState(false);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/pets/")
            .then((res) => {
                let items = [...res.data.result];
                console.log(res, items);
                items.sort(function (a, b) {
                    var One = a.petType.toUpperCase();
                    var Two = b.petType.toUpperCase();
                    if (One < Two) {
                        return -1;
                    }
                    if (One > Two) {
                        return 1;
                    }
                    return 0;
                });
                console.log("items-->", items);
                setAllPets(items);
                //response.data.results we want to save into state (this represents the array of pet objects)
            })
            .catch((err) => {
                console.log("ERROR", err);
            });
    }, [deleted]);

    const deletePet = (petId) => {
        axios
            .delete(`http://localhost:8000/api/pet/delete/${petId}`)
            .then((res) => {
                console.log("res when deleting->", res);
                setDeleted(!deleted);
            })
            .catch((err) => console.log("ERROR", err));
    };

    return (
        <div>
            <Link to="/new" >add a pet to the shelter</Link>
            <p>These pets are looking for a good home </p>
            {allPets.map((petObj, i) => {
                return (
                    <div key={i} style={{ border: "1px solid black" }}>
                        <ul>
                            <li> Name:  {petObj.petName} | &nbsp;
                                Type:  {petObj.petType} | &nbsp;

                                {" "}<Link to={`/pet/${petObj._id}`} >details </Link>{" "}| &nbsp;
                                <Link to={`/pet/edit/${petObj._id}`} >edit </Link>{" "}
                                &nbsp;
                            </li>
                        </ul>
                    </div>
                );
            })}
        </div>
    );
};

export default AllPets;
