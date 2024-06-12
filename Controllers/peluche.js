require('mongoose');
const Pelu = require('../Models/peluche');



const addPeluche = async (animal,name,color,accesorio) => {

    let existPeluche = await Pelu.findOne({ name: name});
    console.log(existPeluche);
    if(!existPeluche) {

        const pelu = new Pelu(
            {              
                animal: animal,
                name:name,
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
/*
//------------ Relaciones entre Tablas -----------------//
/*
usuarioConPeluche =  async(req,res)=>{

    const result = await Usr.aggregate(
        [
            {
                $lookup:
                    {
                        from:"Pelu",
                        localField:"Usr",
                        foreignField : "_id",
                        as : "usuarioPeluche"
                    

                    }
                                   

    
            },{
                "$unwind":"usuarioPeluche"
            } 
        ]
    )
    
    
    
    
    }


*/

module.exports = { addPeluche, getAllPeluches, getPeluche, editPeluche, deletePeluche }