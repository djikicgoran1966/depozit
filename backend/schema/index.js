const { buildSchema } = require("graphql")
const schema = buildSchema(`

input UserInput{
  firstName:String
  lastName:String
  email:String
  password:String
}

input LoginInput{ 
  email: String
  password: String
}

type AuthData{
  id:ID
  token: String
  firstName: String
  lastName:String
  email:String
  tokenExpiration:Int
  role:String
}

type User{
  _id:ID
  firstName:String
  lastName:String
  email:String
  password:String
  role:String

}

input StavkaInput {
    godina:String
    broj_izvoda:String
    datum:String
    kartica:ID
    korisnik:String
    deponent:String
    oznaka:ID!
    broj_predmeta:String
    godina_predmeta:String
    duguje:String
    potrazuje:String
}

type Stavka {
    _id:ID
    godina:String
    broj_izvoda:String
    datum:String
    kartica:Kartica
    korisnik:String
    deponent:String
    oznaka:Oznaka
    broj_predmeta:String
    godina_predmeta:String
    duguje:String
    potrazuje:String
}

input PocetnoStanjeInput {
  _id:ID
  kartica:ID
  duguje:String
  potrazuje:String
}

type Oznaka {
    _id:ID
    naziv:String
}

type Kartica {
  _id:ID
  naziv:String
}





type Result{
_id:ID
sumPotrazuje:Float
sumDuguje:Float
saldo:Float
kartica:Kartica
}

type ResultPromet{
  duguje:Float
  potrazuje:Float
  suma:Float
  }


type Item {
  _id:ID
  naziv:String
  datum:String
  price:String
}

  type Query {

    users:[User]
    ordinaryUsers:[User]
    findUser(id:ID):User


    hello: String
    oznake:[Oznaka]
    stavke:[Stavka]
    kartice:[Kartica]
    findKartice(naziv:String):[Kartica]
    findStavkaById(id:ID):Stavka
    findNalog(godina:String,broj:String,datum:String):[Stavka]
    items :[Item]
    pretraga(godina:String,broj_izvoda:String,datum:String,kartica:ID,korisnik:String,deponent:String,oznaka:ID,broj_predmeta:String,godina_predmeta:String,duguje:String,potrazuje:String):[Stavka]
    getKarticeBySum(from:String,to:String):[Result]
    getKarticeByYear(year:String):[Result]
    getKarticeByDetails(year:String,id:ID):[Stavka]
    getKarticeByIdAndByYear(id:ID,year:String):[Stavka]
    negativeKartice :[Result]
    findStavkeByKartica(kartica:ID):[Stavka]
    getSum:Float
    prometSum(year:String):ResultPromet
  }

  type Mutation {

    createUser(userInput:UserInput):User
    deleteUser(id:ID):User
    login(loginInput:LoginInput):AuthData
    updateUser(id:ID,firstName:String,lastName:String, email:String):User
    changePassword(id:ID,password:String,newPassword:String,confirmation:String):User


    createOznaka(naziv:String):Oznaka
    deleteOznaka(id:ID):Oznaka
    updateOznaka(id:ID, naziv:String):Oznaka
    

  
    createStavka(stavkaInput:StavkaInput):Stavka
    createPocetnoStanje(stavkaInput:StavkaInput):Stavka
    updateStavka(id:ID, newStavka:StavkaInput):Stavka
    deleteStavka(id:ID ):Stavka
    deleteAllStavka:[Stavka]
    
    
    createKartica(naziv:String):Kartica
    deleteKartica(id:ID):Kartica
    updateKartica(id:ID, naziv:String):Kartica

    createItem(naziv:String, datum:String, price:String):Item
    deleteItem(_id:ID):Item
    updateItem(_id:ID, naziv:String,datum:String,price:String):Item
  }

`)


module.exports=schema