
const checkStavka=(godina, broj_izvoda, datum,kartica,korisnik, deponent, oznaka, broj_predmeta,godina_predmeta, duguje,potrazuje  )=>{
  
    if(godina==="" || broj_izvoda==="" ||datum==="" || kartica==="" || oznaka===""  || duguje==="" || potrazuje===""  ) {
        return  { isError:true,error: new Error("Unesite sve potrebne podatke")}
    }
    if(isNaN(godina)) {
        return { isError:true, error: new Error("Godina izvoda mora biti brojčana vrednost")}
    }
    if(isNaN(broj_izvoda)) {
        return { isError:true, error: new Error("Broj izvoda mora biti brojčana vrednost")}
    }
    if( broj_predmeta!=="" && isNaN(broj_predmeta)) {
        return { isError:true, error: new Error("Broj predmeta mora biti brojčana vrednost")}
    }
    if( godina_predmeta!=="" && isNaN(godina_predmeta)) {
        return { isError:true, error: new Error("Godina predmeta mora biti brojčana vrednost")}
    }
    if(isNaN(duguje)) {
        return { isError:true, error: new Error("Duguje mora biti brojčana vrednost")}
    }
    if(isNaN(potrazuje)) {
        return { isError:true, error: new Error("Potražuje mora biti brojčana vrednost")}
    }
    return { isError:false,error:null}
}

const checkStavkaPocetna=(godina, datum,kartica,duguje,potrazuje )=>{
  
    if(godina===""  ||datum==="" || kartica===""  || duguje==="" || potrazuje==="" ) {
        return  { isError:true,error: new Error("Unesite sve potrebne podatke")}
    }
    if(isNaN(godina)) {
        return { isError:true, error: new Error("Godina izvoda mora biti brojčana vrednost")}
    }
  
    if(isNaN(duguje)) {
        return { isError:true, error: new Error("Duguje mora biti brojčana vrednost")}
    }
    if(isNaN(potrazuje)) {
        return { isError:true, error: new Error("Potražuje mora biti brojčana vrednost")}
    }
    return { isError:false,error:null}
}

// Kartica.find({naziv: {'$regex': naziv,$options:'i'}}).sort({ naziv:"asc"})

const findKarticaById= async(id)=>{
    return await Kartica.findById({_id:id})
    .then( kartica =>{
        return { ...kartica._doc}
    })
    .catch( err=>new Error("ERROR IS", err))
}

const findOznakaById=(id)=>{
    return Oznaka.findById({_id:id})
    .then( oznaka=>{
        return { ...oznaka._doc}
    })
    .catch( err=>new Error("Error in find",err))
}




module.exports={ 
    checkStavka,
    findKarticaById,
    findOznakaById,
    checkStavkaPocetna
}