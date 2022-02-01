const mongoose = require('mongoose');// Import Mongoose to allow us to make a table

// Teh new mongoose.schema just allows us to write the instructions for what each product should have.  The ID field is auto-generated so we don't need to include it here.
// This is how you create a Schema for Products; with validations:
const PetSchema = new mongoose.Schema(
	{
		petName: {
			type: String,
			required: [true, "A pet name is required"],
			minlength: [3, "The pet's name must be at least 3 characters long"]
		},
		petType: {
			type: String,
			required: [true, "A pet type is required"],
			minlength: [3, "The pet's type must be at least 3 characters long"]
		},
		petDescription: {
			type: String,
			required: [true, "A pet description is required"],
			minlength: [3, "The pet's description must be at least 3 characters long"]
		},
		skillOne: {
			type: String,
			required: [true, "A skill is required"],
			min: [0, "The skill must be at least 0"],
			max: [3, "The skill must not exceed past 3"]
		},
		skillTwo: {
			type: String,
			required: [true, "A skill is required"],
			min: [0, "The skill must be at least 0"],
			max: [3, "The skill must not exceed past 3"]
		},
		skillThree: {
			type: String,
			required: [true, "A skill is required"],
			min: [0, "The skill must be at least 0"],
			max: [3, "The skill must not exceed past 3"]
		},
	},
);

// To register the ABOVE code as a table in MongoDB:
// This is how you create a constructor for our model and store in the variable "Product"
// Here we are creating a variable "Product" which is going to represent the name of our table(collection)
const Pet = mongoose.model("Pet", PetSchema); //mongoose is creating a table called "Product" using instructions from "ProductSchema"

module.exports = Pet;