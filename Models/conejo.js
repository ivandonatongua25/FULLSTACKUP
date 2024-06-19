const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const conejoSchema = new Schema({

	
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


const  Cone= mongoose.model('cone',conejoSchema);
module.exports = Cone;

