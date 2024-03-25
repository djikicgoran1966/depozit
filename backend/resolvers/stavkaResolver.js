const Stavka=require("../models/stavkaModel")
const Oznaka=require("../models/oznakaModel")
const Kartica=require("../models/karticaModel")
const {checkStavka, checkStavkaPocetna, findKarticaById,findOznakaById}=require("../utilities/index")
// const { STAVKE } = require("../../frontend/src/queries/stavke")


const createStavka=(args)=>{
    console.log(args.stavkaInput)
const {godina, broj_izvoda, datum,kartica,korisnik, deponent, oznaka, broj_predmeta,godina_predmeta, duguje,potrazuje }=args.stavkaInput

const {isError,error}=checkStavka(godina, broj_izvoda, datum,kartica,korisnik, deponent, oznaka, broj_predmeta,godina_predmeta, duguje,potrazuje)


if(isError){
    console.log(error)
    return error
}

//  let newStavka
//   const newStavka=new Stavka({godina,broj_izvoda,datum,kartica,korisnik,deponent,broj_predmeta,godina_predmeta, duguje,potrazuje})
  const newStavka=new Stavka({godina,broj_izvoda,datum,kartica,korisnik,deponent,oznaka,broj_predmeta, godina_predmeta, duguje,potrazuje})
  
//   if(oznaka===null){
//     newStavka=new Stavka({godina,broj_izvoda,datum,kartica,korisnik,deponent,broj_predmeta, godina_predmeta, duguje,potrazuje})
//   }else {
//     newStavka=new Stavka({godina,broj_izvoda,datum,kartica,korisnik,deponent,broj_predmeta, godina_predmeta, duguje,potrazuje})
//   }
   

return newStavka.save()
.then( stavka=>{

    let result
    if ( stavka.oznaka===null ){
        result={...stavka._doc,kartica:findKarticaById(stavka.kartica) }
    }
    else {
        result= { ...stavka._doc,kartica:findKarticaById(stavka.kartica),oznaka:findOznakaById(stavka.oznaka) }
    }
    return result
})
.catch(err=> new Error(err))
}

const createPocetnoStanje=(args)=>{
    console.log(args.stavkaInput)
    const {godina, broj_izvoda, datum,kartica,korisnik, deponent, oznaka, broj_predmeta,godina_predmeta, duguje,potrazuje }=args.stavkaInput
    
    const {isError,error}=checkStavka(godina, broj_izvoda, datum,kartica,korisnik, deponent, oznaka, broj_predmeta,godina_predmeta, duguje,potrazuje)
    
    
    if(isError){
        console.log(error)
        return error
    }
    
    
      const newStavka=new Stavka({godina,broj_izvoda,datum,kartica,korisnik,deponent,oznaka,broj_predmeta,godina_predmeta, duguje,potrazuje})
    
    return newStavka.save()
    .then( stavka=>{
        return { ...stavka._doc, kartica:findKarticaById(stavka.kartica),oznaka:findOznakaById(stavka.oznaka)}
    })
    .catch(err=> new Error("Greška prilikom pristupa DB"))
    }

const stavke=()=>{
    return Stavka.find({})
    .then( stavke=>{
        return stavke.map(stavka=>{
            
            // return { ...stavka, kartica:Kartica.findById({_id:stavka.kartica}), oznaka:Oznaka.findById({_id:stavka.oznaka}) }
            return { ...stavka._doc,kartica:findKarticaById(stavka.kartica),oznaka:findOznakaById(stavka.oznaka) }

        })
    }  )
    .catch( err=>new Error(err))
}

const findStavkaById=({id})=>{
    console.log("id is ",id)
   return Stavka.findById({_id:id})
    .then( stavka=>{
        console.log("stavka is ",stavka)
        return { ...stavka._doc, kartica:findKarticaById(stavka.kartica), oznaka:findOznakaById(stavka.oznaka) }
    } )
    .catch( err=>new Error("Greška prilikom pristupa DB"))
}

const deleteStavka=({id})=>{
    console.log("Id is ",id)
   return Stavka.findByIdAndDelete({_id:id})
    .then( stavka=>{
        return { ...stavka._doc, kartica:findKarticaById(stavka.kartica), oznaka:findOznakaById(stavka.oznaka) }
    })
    .catch(err=>new Error(err))
}

const updateStavka=(args)=>{
    const {id,newStavka }=args
    const {godina, broj_izvoda, datum,kartica,korisnik, deponent, oznaka, broj_predmeta,godina_predmeta, duguje,potrazuje }=newStavka
   
    const {isError,error}=checkStavka(godina, broj_izvoda, datum,kartica,korisnik, deponent, oznaka, broj_predmeta,godina_predmeta, duguje,potrazuje)


if(isError){
    console.log(error)
    return error
}
   
   return Stavka.findByIdAndUpdate({_id:id},{godina, broj_izvoda, datum,kartica,korisnik, deponent, oznaka, broj_predmeta,godina_predmeta, duguje,potrazuje},{ new:true})
    .then( stavka=>{
        return { ...stavka._doc, kartica:findKarticaById(stavka.kartica), oznaka:findOznakaById(stavka.oznaka) }

    })
    .catch(err=> new Error("Greška prilikom pristupa DB"))
}

const deleteAllStavka=()=>{
    return Stavka.deleteMany({})
    .then(stavke=>{
        if(stavke.length>0){
            return   stavke.map(stavka=>{
                return {...stavka._doc }
            })
        }
    
    })
    .catch(err=>new Error(err))
    }

   const findNalog=(args)=>{
    const { godina, broj,datum}=args
    
return Stavka.find({godina,broj_izvoda:broj,datum})
.then( stavke=>{
    return stavke.map(stavka=>{
        let result
        if ( stavka.oznaka===null ){
            result={...stavka._doc,kartica:findKarticaById(stavka.kartica) }
        }
        else {
            result= { ...stavka._doc,kartica:findKarticaById(stavka.kartica),oznaka:findOznakaById(stavka.oznaka) }
        }
        return result
                // return { ...stavka, kartica:Kartica.findById({_id:stavka.kartica}), oznaka:Oznaka.findById({_id:stavka.oznaka}) }

    })
}  )
.catch( err=>new Error("Error occured",err))
   }
    
   const pretraga=  async ({godina,broj_izvoda,datum,kartica,korisnik,deponent,oznaka,broj_predmeta,godina_predmeta,duguje,potrazuje})=>{
    console.log("Oznaka je ", oznaka)
    const cgodina=godina==="" ? {} : {godina}
     const cbroj_izvoda=broj_izvoda==="" ? {}: {broj_izvoda}
     const cdatum=datum==="" ? {}: {datum}
     const ckartica=kartica==="" ? {}:{kartica}
     const ckorisnik=korisnik==="" ? {}:{korisnik}
     const cdeponent=deponent==="" ? {}:{deponent}
     const coznaka=oznaka==="64dcad2c93eddbd5eb3a32ed" ? {}:{oznaka}
     const cbroj_predmeta=broj_predmeta==="" ? {}:{broj_predmeta}
     const cgodina_predmeta=godina_predmeta==="" ? {}:{godina_predmeta}
     const cduguje=duguje==="" ? {}:{duguje}
     const cpotrazuje=potrazuje==="" ? {}:{potrazuje}

    
    const result=await  Stavka.find({ $and: [ cgodina,cbroj_izvoda,cdatum,ckartica,ckorisnik,cdeponent,coznaka,cbroj_predmeta,cgodina_predmeta,cduguje,cpotrazuje]})
    // return  Stavka.find({ $and: [ cgodina,cbroj_izvoda,cdatum,ckartica]})
    const result1=result.sort((a,b) => (a.datum > b.datum) ? 1 : ((b.datum > a.datum) ? -1 : 0))
    console.log(result1)
    
               return result1.map(stavka=>{
                let result
                if ( stavka.oznaka==="64dcad2c93eddbd5eb3a32ed" ){
                    result={...stavka._doc,kartica:findKarticaById(stavka.kartica) }
                }
                else {
                    result= { ...stavka._doc,kartica:findKarticaById(stavka.kartica),oznaka:findOznakaById(stavka.oznaka) }
                }
                console.log("Result is ", result.datum)
                return result
        // return { ...stavka._doc,kartica:findKarticaById(stavka.kartica),oznaka:findOznakaById(stavka.oznaka) }
        })
       
    
   }

   
   
   
   const findStavkeByKartica=(args)=>{
    const { kartica}=args
    return Stavka.find({kartica})
    .then(stavke=>{
        return stavke.map(stavka=>{
            return  { ...stavka._doc,kartica:findKarticaById(stavka.kartica),oznaka:findOznakaById(stavka.oznaka) }
        })
    })
    .catch(err=>new Error(err))
   }



module.exports={
    createStavka,
    stavke,
    findStavkaById,
    deleteStavka,
    updateStavka,
    deleteAllStavka,
    findNalog,
    pretraga,
    createPocetnoStanje,
    findStavkeByKartica
}