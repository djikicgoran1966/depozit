import { gql } from '@apollo/client'

export const STAVKE=gql `
{ 
stavke { 
    _id
  godina
  broj_izvoda
  kartica { 
  _id
   naziv 
  }
  korisnik
  deponent
  oznaka { 
  _id
  naziv
  }
  broj_predmeta
  godina_predmeta
  duguje
  potrazuje
}
}
`

export const  FINDNALOG=gql `
query FindNalog($godina:String, $broj:String, $datum:String) {
  findNalog(godina:$godina,broj:$broj,datum:$datum) {
    _id
  godina
  broj_izvoda
  datum
  kartica { 
  _id
   naziv 
  }
  korisnik
  deponent
  oznaka { 
  _id
  naziv
  }
  broj_predmeta
  godina_predmeta
  duguje
  potrazuje
  }
 }

`

export const  PRETRAGA=gql `
query Pretraga($godina:String, $broj_izvoda:String, $datum:String,$kartica:ID,$korisnik:String,$deponent:String,$oznaka:ID,$broj_predmeta:String,$godina_predmeta:String,$duguje:String,$potrazuje:String) {
  pretraga(godina:$godina,broj_izvoda:$broj_izvoda,datum:$datum,kartica:$kartica,korisnik:$korisnik,deponent:$deponent,oznaka:$oznaka,broj_predmeta:$broj_predmeta,godina_predmeta:$godina_predmeta,duguje:$duguje,potrazuje:$potrazuje) {
  #   query Pretraga($godina:String, $broj_izvoda:String, $datum:String,$kartica:ID) {
  # pretraga(godina:$godina,broj_izvoda:$broj_izvoda,datum:$datum,kartica:$kartica) {

    _id
  godina
  broj_izvoda
  datum
  kartica { 
  _id
   naziv 
  }
  korisnik
  deponent
  oznaka { 
  _id
  naziv
  }
  broj_predmeta
  godina_predmeta
  duguje
  potrazuje
  }
 }

`

export const  FINDSTAVKEBYKARTICA=gql `
query FindStavkeByKartica($kartica:ID) {
  findStavkeByKartica(kartica:$kartica) {
    _id
  godina
  broj_izvoda
  datum
  kartica { 
  _id
   naziv 
  }
  korisnik
  deponent
  oznaka { 
  _id
  naziv
  }
  broj_predmeta
  godina_predmeta
  duguje
  potrazuje
  }
 }

`

export const GETSUM=gql `
{ 
getSum 
}
`
export const PROMETSUM=gql `
query PrometSum($year:String){
  prometSum(year:$year) {
    duguje
    potrazuje
    suma
  }
}
`