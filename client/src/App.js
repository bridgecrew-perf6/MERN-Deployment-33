// In this version - all Products will show up on Port 3000; To add a product, need a new "create" button to  bring to a form (in /new created on lines 33-36)
// To redirect to Port 3000 (or homepage) after creating a new product = > add 1) Use History; 2) initialize useHistory & 3) history.push("/") into "Add Product" file 
//Now go to homepage to add a create button to take us to /new - do this below (while in App.js - line 26 )
import './App.css';
// import React, { useState } from 'react';
import CreatePet from './components/CreatePet';
import AllPets from './components/AllPets';
import ViewOnePet from './components/ViewOnePet';
import EditPet from './components/EditPet';


import {
  BrowserRouter, //tells the application we can enable routing
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {

  return (
    <BrowserRouter>
      <div className="App container">
        <h1>Pet Shelter</h1>

        <Switch>
          <Route exact path="/">
            <hr />

            <AllPets />
          </Route>


          <Route exact path="/new">
            Know a pet needing a home?
            <CreatePet />
            <hr />
          </Route>

          <Route exact path="/pet/:id">
            <ViewOnePet />
          </Route>

          <Route exact path="/pet/edit/:id">
            <EditPet />
          </Route>


        </Switch>

      </div>
    </BrowserRouter>
  );
}

export default App;
