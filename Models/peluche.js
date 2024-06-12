const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const pelucheSchema = new Schema({

	animal:{
		type: String,
		required:true,
		
	},
	name:{
		type: String,
		required:true,
        index: {unique: true, dropDups: true}
    },
    color:{
		type: String,
		required:true
	},
	accesorio:{
		type: String,
		required:true
	},
	
	
}, { timestamps: true } ).set('toJSON',{
    transform: (document, object) => {
        object.id = document.id;
        delete object._id;
    }
});


const Pelu = mongoose.model('pelu',pelucheSchema);
module.exports = Pelu;