const mongoose=require("mongoose")

const schema=mongoose.Schema
const OznakaSchema= new schema({
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

module.exports=Oznaka=mongoose.model("Oznaka",OznakaSchema)