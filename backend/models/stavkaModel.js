const mongoose=require("mongoose")


const schema=mongoose.Schema
const StavkaSchema= new schema({
    godina:{
        type:Number,
        required:true
    },
    broj_izvoda:{
        type:Number,
        required:true
    },
    datum: {
        type:String,
        required:true
    },
    kartica:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Kartica"
    },
    korisnik:{
        type:String,
        required:false
    },
    deponent:{
        type:String,
        required:false
    },
    oznaka:{   
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Oznaka"    
    },
    broj_predmeta:{
        type:Number,
        required:false
    },
    godina_predmeta:{
        type:Number,
        required:false
    },
    duguje:{
        type:Number,
        required:true
    },
    potrazuje:{
        type:Number,
        required:true
    },
    // text:{
    //     type:String,
    //     required:[true, "Please dd a text value "]
    // },
   
  
},  { 
    timestamps:true
})

module.exports=Stavka=mongoose.model("Stavka",StavkaSchema)