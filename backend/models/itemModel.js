const mongoose=require("mongoose")

const schema=mongoose.Schema
const ItemSchema= new schema({
    naziv:{
        type:String,
        required:true
    },
    
     datum:{
         type:String,
         required:[true, "Please add text value "]
     },
   
     price :{
        type:Number,
        required:true
     }
},  { 
    timestamps:true
})

module.exports=Item=mongoose.model("Item",ItemSchema)