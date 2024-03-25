const Item=require("../models/itemModel")

const createItem=(args)=>{
    const {naziv,datum,price}=args
    console.log("Price je",price)
    if(!naziv || !datum || !price) {
        return new Error("Unesite potrebne podatke")
    }

    if(isNaN(price)){
        return new Error("Price has to be a number")
    }

    // return Kartica.findOne({naziv})
    return Item.find({naziv: {'$regex': naziv,$options:'i'}})
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
            return new Error("Item sa tim nazivom već postoji")
        } else {
            const priceNumber=parseFloat(price)
            const item=new Item({ naziv, datum,price:priceNumber})
            return item.save()
            .then(result=>{
                return {...result._doc}
            })
            .catch(err=>new Error("Greška prilikom pristupa DB"))
        }

      
    })
    .catch(err=> new Error(err))
}


const items=()=>{
    console.log("Called items func")
    return Item.find({})
        .then(result=>{
            console.log("Result is ",result)
            return result.map(item=>{
                console.log("Item",item)
                return {...item._doc}
            })
        })
        .catch(err=>new Error("Nije moguće pristupiti bazi podataka"))
}

const deleteItem=(args)=>{
    const {_id}=args
    Item.findByIdAndDelete({_id})
             .then( item=>{
              return {...item._doc }
    })
    .catch(err=>new Error("Greška prilikom pristupa DB"))
        }
  
        const updateItem=(args)=>{
            const {_id,naziv,datum,price}=args
            console.log("Id je",_id)
            if(!naziv || !datum || !price) {
                return new Error("Unesite potrebne podatke")
            }
        
            if(isNaN(price)){
                return new Error("Price has to be a number")
            }
        
            // return Kartica.findOne({naziv})
            return Item.find({naziv: {'$regex': naziv,$options:'i'}})
            .then( results =>{
                  let isMatch=false
                if(results.length!==0) {
                    // console.log("Result is ", results)
                    results.map(result=>{
                       if( (JSON.stringify(result.naziv).toUpperCase()=== JSON.stringify(naziv).toUpperCase()) && ( _id!==result._id.toString()) ) {
                       console.log(_id)
                       console.log(result._id.toString())
                        isMatch=true
                        // if( isMatch){
                        //     return new Error("Item sa tim nazivom već postoji")
                        // } else {
                        //     const priceNumber=parseFloat(price)
                        //     console.log("prolazi")
                        //     // const item=new Item({ naziv, datum,price:priceNumber})
                        //     return Item.findByIdAndUpdate({_id}, { naziv,datum,price:priceNumber}, {new:true })
                        //     .then(result=>{
                        //         return {...result._doc}
                        //     })
                        //     .catch(err=>new Error("Greška prilikom pristupa DB"))
                        // }
                       }
                       console.log( "Is match is ", isMatch)
                      
                    })
                } 
                
                if( isMatch){
                    return new Error("Item sa tim nazivom već postoji")
                } else {
                    const priceNumber=parseFloat(price)
                    // const item=new Item({ naziv, datum,price:priceNumber})
                    return Item.findByIdAndUpdate({_id}, { naziv,datum,price:priceNumber}, {new:true })
                    .then(result=>{
                        return {...result._doc}
                    })
                    .catch(err=>new Error("Greška prilikom pristupa DB"))
                }
            })
            .catch(err=> new Error(err))
        }
        

        


module.exports={
    createItem,
    items,
    deleteItem,
    updateItem
}