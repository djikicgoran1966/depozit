const express =require ("express")
const cors=require("cors")
const path=require('path')
const isAuth=require('./middlewares/isAuth')
require("dotenv").config()
const mongoose=require("mongoose")
const { graphqlHTTP } = require("express-graphql")

const schema=require("./schema/index")
const stavkaResolver=require("./resolvers/stavkaResolver")
const oznaeResolver=require("./resolvers/oznakaResolver")
const karticaResolver=require("./resolvers/karticaResolver")
const itemResolver=require("./resolvers/itemResolver")
const userResolver=require("./resolvers/userResolver")
const root={...stavkaResolver, ...oznaeResolver, ...karticaResolver, ...itemResolver,...userResolver}

const app=express()
app.use(cors())
app.use("/",isAuth)
const PORT= process.env.PORT|| 5000

app.use(express.static(path.join(__dirname,'..', 'frontend','build')))
app.get('/*', (req,res)=>{
 res.sendFile(path.join(__dirname, 'frontend','..' ,'build','index.html' ))
 })
// app.get("/", (req,res)=>{
//   res.send("Hello World")
// })
 console.log( "First path is" , path.join(__dirname, '..', 'frontend', 'build','index.html'))
 console.log( "Second path is" , path.join(__dirname, '..', 'frontend', 'build'))



const dbConfig=process.env.DB
 mongoose.set('strictQuery', true)

mongoose.connect(dbConfig)
  .then(() => console.log(`DB connected at port 27017, ${process.env.DB}`));

  app.use(
    "/graphql",
    graphqlHTTP({
      schema: schema,
      rootValue: root,
      graphiql: true,
    })
  )

app.listen(PORT, ()=>{
    console.log(` Server is listening on port ${PORT}`)
})