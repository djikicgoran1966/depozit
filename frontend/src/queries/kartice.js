import { gql } from '@apollo/client'

export const KARTICE=gql `
{ 
kartice { 
 _id
  naziv
}
}
`

export const  FINDNKARTICE=gql `
query FindKartice($naziv:String) {
  findKartice(  naziv:$naziv) {
    _id
  naziv
  }
 }
`
export const NEGATIVEKARTICE=gql `
{
 negativeKartice{
  _id
  sumDuguje
  sumPotrazuje
  saldo
  kartica { 
  _id
    naziv
  }
  }
}
`

export const  GETKARTICEBYSUM=gql `
query GetKarticeBySum($from:String,$to:String) {
  getKarticeBySum(from:$from,to:$to) {
    _id
  sumDuguje
  sumPotrazuje
  saldo
  kartica {
    _id
    naziv
  }
  }
 }
`

export const  GETKARTICEBYYEAR=gql `
query GetKarticeByYear($year:String) {
  getKarticeByYear(year:$year) {
  _id
  sumDuguje
  sumPotrazuje
  saldo
  kartica {
    _id
    naziv
  }
  }
 }
`
export const  GETKARTICEBYDETAILS=gql `
query GetKarticeByDetails($year:String,$id:ID) {
  getKarticeByDetails(year:$year,id:$id) {
  _id
  godina
  broj_izvoda
  datum
  oznaka {
    _id
    naziv
  }
  broj_predmeta
  godina_predmeta

  kartica {
    _id
    naziv
  }
  korisnik
  deponent
  duguje
  potrazuje
  }
 }
`
export const  GETKARTICEBYIDANDBYYEAR=gql `
query GetKarticeByIdAndByYear( $id:ID, $year:String) {
  getKarticeByIdAndByYear(id:$id, year:$year) {
  _id
  godina
  broj_izvoda
  datum
  oznaka {
    _id
    naziv
  }
  broj_predmeta
  godina_predmeta

  kartica {
    _id
    naziv
  }
  korisnik
  deponent
  duguje
  potrazuje
  }
 }
`
