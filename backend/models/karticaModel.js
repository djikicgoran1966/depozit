const mongoose=require("mongoose")

const schema=mongoose.Schema
const KarticaSchema= new schema({
    naziv:{
        type:String,
        required:true
    },
    
    // text:{
    //     type:String,
    //     required:[true, "Please dd a text value "]
    // },
   
  
},  { 
    timestamps:true
})

module.exports=Kartica=mongoose.model("Kartica",KarticaSchema)