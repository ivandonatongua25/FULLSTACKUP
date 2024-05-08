require('mongoose');
const Cone = require('../Models/conejo');


const addConejo = async (animal,nombre,color,accesorio) => {

    let existConejo = await Cone.findOne({ nombre: nombre});
    console.log(existConejo);
    if(!existConejo) {

        const cone = new Cone(
            {              
                animal: animal,
                nombre:nombre,
                color: color,
                accesorio:accesorio,
            
            }
        );

        let conec = await cone.save(); 
        console.log("Conejo nuevo");
        console.log(conec);
        return { conec }; 

    }else{
        return false;
    }
}   

const getAllConejos = async (limit,offset) => {

    const conejos = await Cone.find({}).limit(limit).skip(offset);

    return conejos;
}

const getConejo = async(id) => {

    const conejo = await Cone.findById(id);

    return conejo;
}

const editConejo = async(p) => {

    const result = await Cone.findByIdAndUpdate(p._id,p,{new:true});

    return result;
}



const deleteConejo = async(id) => {

    const result = await Cone.findByIdAndDelete(id);

    return result;
}

module.exports = { addConejo, getAllConejos, getConejo, editConejo, deleteConejo }