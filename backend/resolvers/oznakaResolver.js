
const Oznaka=require("../models/oznakaModel")

const createOznaka=(args)=>{
    const {naziv}=args
    console.log("Naziv je",naziv)
    if(!naziv) {
        return new Error("Unesite naziv oznake")
    }

    // return Kartica.findOne({naziv})
    return Oznaka.find({naziv: {'$regex': naziv,$options:'i'}})
    .then( results =>{
          let isMatch=false
        if(results.length!==0) {
            console.log("Result is ", results)
            results.map(result=>{
               if( JSON.stringify(result.naziv).toUpperCase()=== JSON.stringify(naziv).toUpperCase()) {
                isMatch=true
               }
               console.log( "Is match is ", isMatch)
              
            })
        } 
        
        if( isMatch){
            return new Error("Oznaka sa tim nazivom već postoji")
        } else {
            const oznaka=new Oznaka({ naziv})
            return oznaka.save()
            .then(result=>{
                return {...result._doc}
            })
            .catch(err=>new Error("Greška prilikom pristupa DB"))
        }

      
    })
    .catch(err=> new Error(err))
}


const oznake=()=>{
    return Oznaka.find({}).sort({naziv:"asc"})
        .then(result=>{
            return result.map(oznaka=>{
                return {...oznaka._doc}
            })
        })
        .catch(err=>new Error("Nije moguće pristupiti bazi podataka"))
}

const deleteOznaka=(args)=>{
    const {id}=args
    return Stavka.find({oznaka:id})
    .then (stavka=>{
        if(stavka.length>0){
            return new Error("Ne možete obrisati oznaku. ")
        }
        else {
            return Oznaka.findByIdAndDelete({_id:id})
             .then( oznaka=>{
              return {...oznaka._doc }
    })
    .catch(err=>new Error("Greška prilikom pristupa DB"))
        }
    }) .catch(err=>new Error("Greška prilikom pristupa DB"))
    
}

const updateOznaka=(args)=>{
    const {id, naziv }=args

    if(!id || !naziv) {
        return new Error("Niste uneli potrebne podatke")
    }
    return Oznaka.findByIdAndUpdate({_id:id}, { naziv}, {new:true })
    .then(result=>{
        return { ...result._doc }
    })
    .catch(err=>new Error("Nije moguće pristupiti DB"))
}


module.exports={
    createOznaka,
    oznake,
    deleteOznaka,
    updateOznaka
}