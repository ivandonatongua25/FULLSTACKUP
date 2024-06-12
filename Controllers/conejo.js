require('mongoose');
const Cone = require('../Models/conejo');


const addConejo = async (email,nombreAnimal,imgAnimal,imgAccesorio,color) => {

    let existConejo = await Cone.findOne({ email: email});
    console.log(existConejo);
    if(!existConejo) {


        const cone = new Cone(
            {              
                email: email,
                nombreAnimal:nombreAnimal,
                imgAnimal:imgAnimal,
                imgAccesorio:imgAccesorio,
                color:color,
        
            
            }
        );

        let conec = await cone.save(); 
        console.log("usuario Con Peluche Registrado");
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