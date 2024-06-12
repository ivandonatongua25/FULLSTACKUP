require('mongoose');
const Pelu = require('../Models/peluche');
const Usr = require("../Models/user");

const Schema = mongoose.Schema;
const usrPeluSchema = new Schema({

    email:{
		type: String,
		required:true,
		index: {unique: true, dropDups: true}
	},
    nombreAnimal: {
		type: String,
		required:true,
		
	},
    imgAnimal : {
		type: String,
		required:true,
		
	},
    imgAccesorio : {
		type: String,
		required:true,
		
	},
    color :{
		type: String,
		required:true,
		
	},


}, { timestamps: true } ).set('toJSON',{
    transform: (document, object) => {
        object.id = document.id;
        delete object._id;
    }
});

const UserPeluche = mongoose.Model('userpeluche',usrPeluSchema);
module.exports = UserPeluche;