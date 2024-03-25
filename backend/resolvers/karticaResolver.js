const { default: mongoose } = require("mongoose")
const Kartica=require("../models/karticaModel")
const Stavka = require("../models/stavkaModel")
const{ findKarticaById, findOznakaById}=require("../utilities/index")

const createKartica=(args)=>{
    const {naziv, datum}=args
    console.log("Naziv je",naziv)
    if(!naziv) {
        return new Error("Unesite naziv kartice")
    }

    // return Kartica.findOne({naziv})
    return Kartica.findOne({naziv: {'$regex': naziv,$options:'i'}})
    .then( result =>{
        console.log("result is"+ result)
         if(result && result.naziv.length===naziv.length){
            console.log( naziv, result.naziv)
            return new Error("Kartica sa tim nazivom već postoji")
        }
        const kartica=new Kartica({ naziv})
        return kartica.save()
        .then(result=>{
            return {...result._doc}
        })
        .catch(err=>new Error("Greška prilikom pristupa DB"))
    })
    .catch(err=> new Error(err))
}

const kartice=()=>{
    return Kartica.find({}).sort({ naziv:"asc"})
        .then(result=>{
            return result.map(kartica=>{
                return {...kartica._doc}
            })
        })
        .catch(err=>new Error("Nije oguće pristupiti DB"))
}

const deleteKartica=(args)=>{
    const {id}=args
    return Stavka.find({kartica:id})
    .then (stavka=>{
        if(stavka.length>0){
            return new Error("Ne možete obrisati karticu. ")
        }
        else {
            return Kartica.findByIdAndDelete({_id:id})
             .then( kartica=>{
              return {...kartica._doc }
    })
    .catch(err=>new Error("Greška prilikom pristupa DB"))
        }
    }) .catch(err=>new Error("Greška prilikom pristupa DB"))
    
}

const updateKartica=(args)=>{
    const { id, naziv }=args
  console.log("Id is" ,id, "Naziv is ",naziv)
    if(!id || !naziv) {
        return new Error("Niste uneli potrebne podatke")
    }
   return Kartica.findOne({naziv})
    .then(kartica=>{
        if(kartica) {
            return new Error("Kartica sa tim nazivom već postoji")
        } else {
            return Kartica.findByIdAndUpdate({_id:id}, { naziv}, {new:true })
    .then(result=>{
        return { ...result._doc }
    })
    .catch(err=>new Error("Nije moguće pristupiti DB"))
        }
    })
    .catch(err=>new Error("Nije moguće pristupiti DB"))
    
}

const findKartice=(args)=>{
    const {naziv}=args
    return Kartica.find({naziv: {'$regex': naziv,$options:'i'}}).sort({ naziv:"asc"})
    .then( kartice=>{
       return  kartice.map(kartica=>{
            return {...kartica._doc}
        })
    }
    )
    .catch(err=>new Error("Nije moguće pristupiti DB"))
}

const getKarticeBySum=async(args)=>{
   
    const { from,to}=args
    if(from==="" && to==="") return new Error("Unesite bar jednu vrednost")
    if(from!=="" && isNaN(from) ) return new Error("Od mora biti brojčana vrednost")
    if(to!=="" && isNaN(to) ) return new Error("Do mora biti brojčana vrednost")

    const suma= await Stavka.aggregate( [ {$match:{}},  {$group:{_id:"$kartica",sumPotrazuje:{$sum:"$potrazuje"},sumDuguje:{$sum:"$duguje"}} } ] )
  
    let kartice=[]
    if(from==="") {
        for(let i=0;i<suma.length;i++){
            // console.log(suma[i].sumDuguje)
            if(suma[i].sumPotrazuje-suma[i].sumDuguje<=to){
                let saldo=suma[i].sumPotrazuje-suma[i].sumDuguje
                suma[i]={...suma[i],saldo}
                kartice.push(suma[i])
            }
        }

        return kartice.map(result=>{
            return { ...result,kartica:findKarticaById(result._id) }
           }) 
    }
    if(to==="") {
        for(let i=0;i<suma.length;i++){
            // console.log(suma[i].sumDuguje)
            if(suma[i].sumPotrazuje-suma[i].sumDuguje>=from){
                let saldo=suma[i].sumPotrazuje-suma[i].sumDuguje
                suma[i]={...suma[i],saldo}
                kartice.push(suma[i])
            }
        }
        return kartice.map(result=>{
            return { ...result,kartica:findKarticaById(result._id) }
           }) 
    }

    for(let i=0;i<suma.length;i++){
        // console.log(suma[i].sumDuguje)
        if(suma[i].sumPotrazuje-suma[i].sumDuguje<=to &&  suma[i].sumPotrazuje-suma[i].sumDuguje>=from ){
            let saldo=suma[i].sumPotrazuje-suma[i].sumDuguje
            suma[i]={...suma[i],saldo}
            kartice.push(suma[i])
        }
    }
    return kartice.map(result=>{
        return { ...result,kartica:findKarticaById(result._id) }
       }) 

   }



const  negativeKartice= async ()=>{
    let kartice=[]
    let stavke=[]
    const result=[]
   
    const suma= await Stavka.aggregate( [ {$match:{}}, {$group:{_id:"$kartica",sumPotrazuje:{$sum:"$potrazuje"},sumDuguje:{$sum:"$duguje"}}} ] )
   
    console.log(suma[0])
    for(let i=0;i<suma.length;i++){
        // console.log(suma[i].sumDuguje)
        if(suma[i].sumDuguje>suma[i].sumPotrazuje){
            let saldo=suma[i].sumPotrazuje-suma[i].sumDuguje
            suma[i]={...suma[i],saldo}
            kartice.push(suma[i])
        }
    }
   return kartice.map(result=>{
    console.log(result)
    return { ...result,kartica:findKarticaById(result._id) }
   }) 
}   

const  getSum= async()=>{
    let suma=0
    let duguje=0
    let potrazuje=0
  let stavke= await Stavka.find({})
   console.log(stavke)
   for (let i=0;i<stavke.length;i++) {
    duguje+=stavke[i].duguje
    potrazuje+=stavke[i].potrazuje
   }
   suma= potrazuje-duguje
   return suma
}

const prometSum=async({year})=>{
    console.log("Called",year)
    let suma=0
    let duguje=0
    let potrazuje=0
    let stavke =await Stavka.find({godina:{$lte: Number(year)}})
    console.log("Length is ",stavke.length)
    for (let i=0;i<stavke.length;i++) {
        duguje+=stavke[i].duguje
        potrazuje+=stavke[i].potrazuje
       }
       suma= potrazuje-duguje
       return { duguje,potrazuje,suma}
}

const getKarticeByYear= async ({year})=>{
    if(!year) {
        return new Error("Unesite godinu do koje želite bruto bilans na karticama")
    } 
    if( isNaN(year)){
        return new Error("Godina mora biti numerička vrednost")
     }
    const x= await Stavka.find().sort({godina:1}).limit(1)
    const minYear=x[0].godina 
   
    const y= await Stavka.find().sort({godina:-1}).limit(1)
    const maxYear=y[0].godina 
    
    console.log(minYear, maxYear)
    if( year<minYear || year>maxYear) {
        return new Error( ` Za ${year} godinu se ne može kreirati izveštaj. Možete kreirati izveštaj u opsegu od ${minYear} do ${maxYear} godine`)
    }

    
    const suma= await Stavka.aggregate( [ {$match:{godina: { $lte: Number(year) } }},  {$group:{_id:"$kartica",sumPotrazuje:{$sum:"$potrazuje"},sumDuguje:{$sum:"$duguje"}} } ] )
    let kartice=[]
    for(let i=0;i<suma.length;i++){
        
    let saldo=suma[i].sumPotrazuje-suma[i].sumDuguje
    suma[i]={...suma[i],saldo}
    kartice.push(suma[i])
    }

    let noveKartice=[]
    let karticaById={}
   
    for(let i=0;i<kartice.length;i++) {
        karticaById= await findKarticaById(kartice[i]._id)
        noveKartice.push ({...kartice[i],kartica:karticaById}) 
    }
  let result=noveKartice.sort((a,b) => (a.kartica.naziv > b.kartica.naziv) ? 1 : ((b.kartica.naziv > a.kartica.naziv) ? -1 : 0))
  return result
}

const getKarticeByDetails= async (args)=>{
    console.log("getKarticeByDetails")
    const {year,id}=args
    if(!year) {
        return new Error("Unesite godinu do koje želite bruto bilans na karticama")
    } 
    if( isNaN(year)){
        return new Error("Godina mora biti numerička vrednost")
     }
    const x= await Stavka.find().sort({godina:1}).limit(1)
    const minYear=x[0].godina 
   
    const y= await Stavka.find().sort({godina:-1}).limit(1)
    const maxYear=y[0].godina 
    
   
    if( year<minYear || year>maxYear) {
        return new Error( ` Za ${year} godinu se ne može kreirati izveštaj. Možete kreirati izveštaj u opsegu od ${minYear} do ${maxYear} godine`)
    }
    // let pocetnoStanje=await Stavka.find({ godina:year, kartica:id})
     let pocetnoStanje= await Stavka.aggregate( [ {$match:{godina: { $lt: Number(year) }, kartica: new mongoose.Types.ObjectId(id)}},  {$group:{_id:"$kartica",potrazuje:{$sum:"$potrazuje"},duguje:{$sum:"$duguje"}} } ] )
    let novoPocetno=[]
    let karticaById={}
    let oznakaById={}
    // pocetnoStanje=  pocetnoStanje.map(stavka=>{
    //     return {...stavka,kartica:findKarticaById(stavka._id),datum:new Date(`01.01.${year}`).toISOString() ,godina:year,broj_izvoda:0,oznaka:"64dcad2c93eddbd5eb3a32ed"}
    // })
  
    for(let i=0;i<pocetnoStanje.length;i++) {
        karticaById= await findKarticaById(pocetnoStanje[i]._id)
        // console.log("KARTICA BY ID ", karticaById)
        novoPocetno.push ({...pocetnoStanje[i],kartica:karticaById._id,datum:new Date(`01.01.${year}`).toISOString() ,godina:year,broj_izvoda:0,oznaka: new mongoose.Types.ObjectId("64dcad2c93eddbd5eb3a32ed")}) 
    }

    pocetnoStanje=novoPocetno
    
    console.log("POCETNO STANJE JEEE", pocetnoStanje)

    let stanje=await Stavka.find({godina:year,kartica:id})
    console.log("STANJE JE", stanje) 
    // let novoStanje=[]
    // for(let i=0;i<stanje.length;i++) {
    //     karticaById= await findKarticaById(stanje[i].kartica)
    //     oznakaById=await findOznakaById(stanje[i].oznaka)
    //     console.log("KARTICA BY ID ", karticaById)
    //     novoStanje.push ({...stanje[i],kartica:karticaById,oznaka:oznakaById}) 
    // }
    //  stanje=novoStanje

    // console.log("NOVO STANJE JEEE", novoStanje)
    // stanje= stanje.map(stavka=>{
    //     return {...stavka._doc,kartica:findKarticaById(stavka.kartica._id),oznaka:findOznakaById(stavka.oznaka)}
    //  })
    
    stanje=stanje.concat(pocetnoStanje)
    console.log("RETURN STANJE JE", stanje)
    // return  stanje.map(stavka=>{
    //     return {...stavka._doc,kartica:findKarticaById(stavka.kartica._id)}
    //  })
    // const newStanje=[...pocetnoStanje,...stanje]
    // return newStanje.map(stavka=>{
    //     return {...stavka}
    // })

//     let kartice=[]
//     for(let i=0;i<suma.length;i++){
        
//     let saldo=suma[i].sumPotrazuje-suma[i].sumDuguje
//     suma[i]={...suma[i],saldo}
//     kartice.push(suma[i])
//     }

//     let stareKartice=[]
//     let karticaById={}
   
//     for(let i=0;i<kartice.length;i++) {
//         karticaById= await findKarticaById(kartice[i]._id)
//         stareKartice.push ({...kartice[i],kartica:karticaById,datum:`01.01.${year}`,broj_izvoda:0,godina:"",broj_predmeta:"",godina_predmeta:"", korisnik:"",deponent:""}) 
//     }

//     const detailedKartice=await Stavka.find({ godina:year})
//     // console.log("Detailed kartice are", {...detailedKartice[0]._doc})
//     let noveKartice=[]
//     for (let i=0;i<detailedKartice.length;i++){
//         karticaById= await findKarticaById(detailedKartice[i].kartica._id)
//         // console.log("Detailed kartica is",detailedKartice[i])
//         // console.log("Kartica by Id",karticaById)
//         noveKartice.push({...detailedKartice[i]._doc,kartica:karticaById})
//     }
//        noveKartice=noveKartice.concat(stareKartice)
//     // let result=noveKartice.sort((a,b) => (a.kartica.naziv > b.kartica.naziv) ? 1 : ((b.kartica.naziv > a.kartica.naziv) ? -1 : 0))
    

//    let result= noveKartice.sort(
//         function(a, b) {          
//            if (a.kartica.naziv === b.kartica.naziv) {
//               // Price is only important when cities are the same
//               return b.datum - a.datum;
//            }
//            return a.kartica.naziv > b.kartica.naziv ? 1 : -1;
//         });


//     return result

//    let result=stanje.sort((a,b) => (a.kartica.naziv > b.kartica.naziv) ? 1 : ((b.kartica.naziv > a.kartica.naziv) ? -1 : 0))
//    return result

let result=stanje.sort((a,b) => (a.datum > b.datum) ? 1 : ((b.datum > a.datum) ? -1 : 0))


return  result.map(stavka=>{
    return {...stavka._doc,id: stavka.id, duguje:stavka.duguje,potrazuje:stavka.potrazuje,datum:stavka.datum,godina_predmeta:stavka.godina_predmeta, broj_predmeta:stavka.broj_predmeta, kartica:findKarticaById(stavka.kartica), oznaka : stavka.oznaka===null ? null :findOznakaById(stavka.oznaka)}
})
}

const getKarticeByIdAndByYear=(args)=>{
    const {id,year}=args
    return Stavka.find({ kartica:id, godina:year})
    .then(stavke =>stavke.map(stavka=>{
        return {...stavka._doc,kartica:findKarticaById(id),oznaka:findOznakaById(stavka.oznaka)}
    }))
    .catch(err=>new Error("Greška prilikom pristupa bazi podataka"))
}


module.exports={
    createKartica,
    kartice,
    deleteKartica,
    updateKartica,
    findKartice,
    getKarticeBySum,
    negativeKartice,
    getSum,
    prometSum,
    getKarticeByYear,
    getKarticeByDetails,
    getKarticeByIdAndByYear
}