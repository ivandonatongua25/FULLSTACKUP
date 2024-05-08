const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const conejoSchema = new Schema({

	animal:{
		type: String,
		required:true,
		
	},
	nombre:{
		type: String,
		required:true,
        index: {unique: true, dropDups: true}
    },
    color:{
		type: String,
		required:true
	},
	accesorio:{
		type: Boolean,
		required:true
	},
	
	
}, { timestamps: true } ).set('toJSON',{
    transform: (document, object) => {
        object.id = document.id;
        delete object._id;
       
    }
});


const  Cone= mongoose.model('cone',conejoSchema);
module.exports = Cone;