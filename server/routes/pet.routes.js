//import the controller file and give it a variable name to reference
const PetController = require("../controllers/pet.controller")

module.exports = app => {
    app.get("/api/pets/", PetController.findAllPets);
    app.post("/api/pet/new", PetController.createNewPet);
    app.get("/api/pet/:id", PetController.findOneSinglePet);
    app.put("/api/pet/update/:id", PetController.updateExistingPet);
    app.delete("/api/pet/delete/:id", PetController.deleteAnExistingPet);

};