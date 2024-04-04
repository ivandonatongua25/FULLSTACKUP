require('mongoose');
const Pelu = require('./models/peluche');


const addPeluche = async (animal,nombre,color,accesorio) => {

    let existPeluche = await Pelu.findOne({ nombre: nombre});
    console.log(existPeluche);
    if(!existPeluche) {

        const pelu = new Pelu(
            {              
                animal: animal,
                nombre:nombre,
                color: color,
                accesorio:accesorio,
            
            }
        );

        let peluc = await pelu.save(); 
        console.log("Peluche nuevo");
        console.log(peluc);
        return { peluc }; 

    }else{
        return false;
    }
}   

const getAllPeluches = async (limit,offset) => {

    const peluches = await Pelu.find({}).limit(limit).skip(offset);

    return peluches;
}

const getPeluche = async(id) => {

    const peluche = await Pelu.findById(id);

   

    return peluche;
}

const editPeluche = async(p) => {

    const result = await Pelu.findByIdAndUpdate(p._id,p,{new:true});

    return result;
}



const deletePeluche = async(id) => {

    const result = await Pelu.findByIdAndDelete(id);

    return result;
}

module.exports = { addPeluche, getAllPeluches, getPeluche, editPeluche, deletePeluche }